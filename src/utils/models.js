const { ModalBuilder , ActionRowBuilder , TextInputBuilder , TextInputStyle } = require('discord.js')


module.exports = (field_label ,title, customId) => {
    const modal = new ModalBuilder().setCustomId(customId).setTitle(title)
    const firstField = new TextInputBuilder().setCustomId(`${customId}_firstField`).setLabel(field_label).setStyle(TextInputStyle.Paragraph)
    const firstactionrow = new ActionRowBuilder().addComponents(firstField)
    modal.addComponents(firstactionrow)
    return modal
}