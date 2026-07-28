"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByFireBaseUid = findUserByFireBaseUid;
exports.createUser = createUser;
exports.updateUserByFirebaseUid = updateUserByFirebaseUid;
const prisma_1 = require("../../lib/prisma");
function findUserByFireBaseUid(firebaseUid) {
    return prisma_1.prisma.user.findUnique({
        where: { firebaseUid },
    });
}
function createUser(data) {
    return prisma_1.prisma.user.create({
        data,
    });
}
function updateUserByFirebaseUid(firebaseUid, data) {
    return prisma_1.prisma.user.update({
        where: { firebaseUid },
        data,
    });
}
