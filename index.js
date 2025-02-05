import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';
import inquirer from 'inquirer';
import sillyname from 'sillyname';
import qr from 'qr-image';
import fs from 'fs';
import superheroes from 'superheroes';

async function main() {
    // Ask for user name
    const answers = await inquirer.prompt([
        { name: "username", message: "What is your name?" }
    ]);
    const username = answers.username;
    
    // Generate names
    const villainname = sillyname();
    const heroname = superheroes.random();
    
    // Display output
    console.log("Hello", username);
    console.log("Your villain name will be", villainname);
    console.log("And your superhero name will be", heroname);
    console.log("QR codes are generated");
    console.log("Text file updated");
    
    // Generate QR codes
    generateQR(username, "name.png");
    generateQR(villainname, "sillyname.png");
    generateQR(heroname, "superheroname.png");
    
    // Save to text file
    const logEntry = `User: ${username}\nVillain: ${villainname}\nSuperhero: ${heroname}\n\n`;
    fs.appendFile("myhero.txt", logEntry, (err) => {
        if (err) throw err;
    });
}

function generateQR(text, filename) {
    const qrCode = qr.image(text, { type: "png" });
    qrCode.pipe(fs.createWriteStream(filename));
}

main();