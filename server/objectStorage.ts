import { Storage, File } from "@google-cloud/storage";
import { Response } from "express";
import { randomUUID } from "crypto";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

export const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

export class ObjectStorageService {
  constructor() {}

  getPrivateObjectDir(): string {
    const dir = process.env.PRIVATE_OBJECT_DIR;
    if (!dir) {
      console.warn("PRIVATE_OBJECT_DIR not set - object storage features will not work");
      return "";
    }
    return dir;
  }

  getPublicObjectDir(): string {
    const paths = process.env.PUBLIC_OBJECT_SEARCH_PATHS;
    if (!paths) {
      console.warn("PUBLIC_OBJECT_SEARCH_PATHS not set - public object storage features will not work");
      return "";
    }
    const firstPath = paths.split(',')[0].trim();
    return firstPath;
  }

  async getUploadURL(): Promise<string> {
    const publicObjectDir = this.getPublicObjectDir();
    if (!publicObjectDir) {
      throw new Error(
        "PUBLIC_OBJECT_SEARCH_PATHS not set. Object storage not configured. " +
          "Please set up object storage in the Replit environment."
      );
    }

    const objectId = randomUUID();
    const fullPath = `${publicObjectDir}/team-photos/${objectId}`;

    const { bucketName, objectName } = parseObjectPath(fullPath);

    return signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900,
    });
  }

  async getHeroBannerUploadURL(): Promise<string> {
    const publicObjectDir = this.getPublicObjectDir();
    if (!publicObjectDir) {
      throw new Error(
        "PUBLIC_OBJECT_SEARCH_PATHS not set. Object storage not configured. " +
          "Please set up object storage in the Replit environment."
      );
    }

    const objectId = randomUUID();
    const fullPath = `${publicObjectDir}/homepage-banners/${objectId}`;

    const { bucketName, objectName } = parseObjectPath(fullPath);

    return signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900,
    });
  }

  normalizeObjectPath(rawPath: string): string {
    if (!rawPath) {
      return rawPath;
    }

    // If it's a full GCS URL, extract just the path
    if (rawPath.startsWith("https://storage.googleapis.com/")) {
      try {
        const url = new URL(rawPath);
        return url.pathname;
      } catch (e) {
        console.warn("Failed to parse object URL:", rawPath);
        return rawPath;
      }
    }

    // Already a path
    return rawPath;
  }
}

export function parseObjectPath(path: string): {
  bucketName: string;
  objectName: string;
} {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  const pathParts = path.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }

  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");

  return {
    bucketName,
    objectName,
  };
}

export async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec,
}: {
  bucketName: string;
  objectName: string;
  method: "GET" | "PUT" | "DELETE" | "HEAD";
  ttlSec: number;
}): Promise<string> {
  const request = {
    bucket_name: bucketName,
    object_name: objectName,
    method,
    expires_at: new Date(Date.now() + ttlSec * 1000).toISOString(),
  };
  const response = await fetch(
    `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to sign object URL, errorcode: ${response.status}, ` +
        `make sure you're running on Replit`
    );
  }

  const { signed_url: signedURL } = await response.json();
  return signedURL;
}
