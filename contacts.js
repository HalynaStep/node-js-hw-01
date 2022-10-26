const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve("./db/contacts.json");


async function listContacts() {
  const readedContacts = await fs.readFile(contactsPath);
  const contacts = JSON.parse(readedContacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    return null
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    return null
  }
  const deletedContact = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(deletedContact))
  return deletedContact;
}

  
  async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newContact = { id: uuidv4(), name, email, phone };
  
  contacts.push(newContact);
await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};