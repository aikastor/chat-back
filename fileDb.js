const fs = require('fs');
const nanoid = require('nanoid');

const readFile = async (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err,data) => {
      if(err) {
        reject(err)
      } else { resolve(data) }
    })
  });

};
const writeFile = (filename, data) => {
  return new Promise ((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if(err) {
        reject(err)
      } else { resolve() }
    })
  })
};

const filename = './messages.json';
let data = [];

module.exports = {
  async init () {
    try {
      const fleContents = await readFile(filename);
      data = JSON.parse(fleContents.toString());
      await data.sort((a, b) =>
          new Date(a.datetime) - new Date(b.datetime)
      );
    } catch (e) {
      console.log('Could not read file ' + filename);
      data = [];
    }
  },

  async getMessages () {
    return data
        .sort((a, b) =>
        new Date(a.datetime) - new Date(b.datetime))

        .slice(-30);
  },
  async getMessagesByDate (date) {
    data.sort((a, b) =>
        new Date(a.datetime) - new Date(b.datetime)
    );
    const index = data.findIndex(x => x.datetime === date);
    return data.slice(index + 1);
  },
  async addMessage (message) {
    message.id = nanoid();
    message.datetime = new Date().toISOString();

    data.push(message);
    await this.save()
  },
  async save () {
    await data.sort((a, b) =>
        new Date(a.datetime) - new Date(b.datetime)
    );
    const fileContents = JSON.stringify(data, null, 2);
    await writeFile(filename, fileContents)
  }
};

