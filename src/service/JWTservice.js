import db from "../models"
const getGroupWithRole = async (user) => {
    let role = await db.Group.findAll({
        where: { id: user.groupId },
        attributes: ["id"],
        include: {
            model: db.Role,
            attributes: ["id", "name",],
            through: { attributes: [] }
        },
        raw: true,
        nest: true

    })


    return role ? role : {}
}
module.exports = { getGroupWithRole }