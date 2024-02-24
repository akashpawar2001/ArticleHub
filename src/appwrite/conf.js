import Config from "../config/Config.js";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(Config.appwriteUrl)
      .setProject(Config.appwriteProjectId);

    this.databases = new Databases(this.client);

    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    featuredImage,
    status,
    auther,
    content,
    category,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          status,
          auther,
          content,
          category,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error", error);
    }
  }

  async updatePost(
    slug,
    { title, featuredImage, status, auther, content, category }
  ) {
    try {
      return await this.databases.updateDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          status,
          auther,
          content,
          category,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
  async getUserPosts(queries) {
    try {
      return await this.databases.listDocuments(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  //file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        Config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(Config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(Config.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
