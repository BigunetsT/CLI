const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const findContact = contacts.find((item) => item.id === contactId);
    if (!findContact) {
      throw new Error("ID incorrect");
    }
    console.log(findContact);
    return findContact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filteredContact = contacts.filter((item) => item.id !== contactId);
    const str = JSON.stringify(filteredContact);
    await fs.writeFile(contactsPath, str);
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      throw new Error("ID incorrect");
    }
    console.log(`Contact with id=${contactId} was deleted`);
  } catch (error) {
    throw error;
  }
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: uuidv4(), name, email, phone };

  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    if (
      contacts
        .map((item) => item.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      throw new Error(`${name} is already in contacts`);
    }
    const newContacts = [...contacts, newContact];
    const str = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, str);
    console.log(newContact);
    return newContact;
  } catch (error) {
    throw error;
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
