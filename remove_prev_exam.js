
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsPath = path.join(__dirname, 'public', 'questions.json');
const data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Filter out the 'prev_exam' category (id: 31 in prev logs, or id: "prev_exam")
// The id shown in console.log earlier was 'prev_exam'
const initialCount = data.categories.length;
data.categories = data.categories.filter(c => c.id !== 'prev_exam');
const finalCount = data.categories.length;

if (initialCount === finalCount) {
    console.log("Category 'prev_exam' not found.");
} else {
    console.log(`Removed 'prev_exam'. Categories count: ${initialCount} -> ${finalCount}`);
    fs.writeFileSync(questionsPath, JSON.stringify(data, null, 2), 'utf8');
}
