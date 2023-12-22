import db from "../models"
const getGroupWithRole = async (user) => {
    let role = await db.Group.findAll({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.Role,
            attributes: ["id", "name", "description"],
            through: { attributes: [] }
        }

    })

    return role ? role : {}
}
module.exports = { getGroupWithRole }