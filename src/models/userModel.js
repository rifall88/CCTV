import prisma from "../database/dbConfig.js";

class User {
  static async create(userData) {
    return prisma.user.create({
      data: userData,
    });
  }
  static async findByUserName(username) {
    return prisma.user.findUnique({
      where: { username },
    });
  }
  static async findAll() {
    return prisma.user.findMany({
      select: { id: true, username: true, role: true },
      orderBy: [{ created_at: "asc" }],
    });
  }
  static async update(id, userData) {
    try {
      //parseInt digunakan karena id yang dari url bertipe string
      return await prisma.user.update({
        where: { id: parseInt(id) },
        data: userData,
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }
  static async delete(id) {
    try {
      //harus menyertakan await agar error bisa di tangkap
      return await prisma.user.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  }
}

export default User;
