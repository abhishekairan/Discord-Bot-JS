import { ModalBuilder , ActionRowBuilder , TextInputBuilder , TextInputStyle } from 'discord.js';


function modal_single_field(field_label ,title, customId){
    const modal = new ModalBuilder().setCustomId(customId).setTitle(title)
    const firstField = new TextInputBuilder().setCustomId(`${customId}_firstField`).setLabel(field_label).setStyle(TextInputStyle.Paragraph)
    const firstactionrow = new ActionRowBuilder().addComponents(firstField)
    modal.addComponents(firstactionrow)
    return modal
}


module.exports = {modal_single_field}