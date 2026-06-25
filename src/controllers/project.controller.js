import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";
import { ProjectMember } from "../models/projectmember.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const getProjects = asyncHandler(async (req, res) => {
  //test
});
const getProjectById = asyncHandler(async (req, res) => {
  //test
});
const createProject = asyncHandler(async (req, res) => {
  //test
});

const UpdateProject = asyncHandler(async (req, res) => {
  //test
});
const DeleteProject = asyncHandler(async (req, res) => {
  //test
});
const addMembersToProject = asyncHandler(async (req, res) => {
  //test
});
const getProjectMembers = asyncHandler(async (req, res) => {
  //test
});
const updateMembersRole = asyncHandler(async (req, res) => {
  //test
});
const deleteMember = asyncHandler(async (req, res) => {
  //test
});

export {
  addMembersToProject,
  createProject,
  getProjects,
  deleteMember,
  updateMembersRole,
  getProjectById,
  DeleteProject,
  getProjectMembers,
  UpdateProject,
};
