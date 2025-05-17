import { pool } from "../db/db.js";
import { getSalt, hashPassword, verifyPassword } from "../controllers/utils/hash.js";

export const getUsers = (req, res) => {
    const id = req.params.id;
    pool.execute('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }
        res.status(200).json({ msg: "ok", users: results.rows });
    });
};

export const postUser = (req, res) => {
    const { name, username, password, age } = req.body;
    const salt = getSalt();
    const hash = hashPassword(password, salt);
    
    pool.execute(
        'INSERT INTO users (name, username, password, salt, age) VALUES (?, ?, ?, ?, ?)',
        [name, username, hash, salt, age],
        (error) => {
            if (error) {
                res.status(500).json({ msg: error });
                return;
            }
            res.status(200).json({ msg: "User created successfully" });
        }
    );
};

export const putUser = (req, res) => {
    const { id } = req.params;
    const { name, username, age } = req.body;

    pool.execute(
        'UPDATE users SET name = ?, username = ?, age = ? WHERE id = ?',
        [name, username, age, id],
        (error, results) => {
            if (error) {
                res.status(500).json({ msg: error });
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).json({ msg: "User not found" });
                return;
            }

            res.status(200).json({ msg: "User updated successfully" });
        }
    );
};

export const deleteUser = (req, res) => {
    const { id } = req.params;

    pool.execute('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ msg: "User not found" });
            return;
        }

        res.status(200).json({ msg: "User deleted successfully" });
    });
};

export const loginUser = (req, res) => {
    const { username, password } = req.body;

    pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (error, results) => {
            if (error || results.length === 0) {
                res.status(401).json({ msg: "Invalid username or password" });
                return;
            }

            const user = results[0];
            const isValid = verifyPassword(password, user.salt, user.password);

            if (!isValid) {
                res.status(401).json({ msg: "Invalid username or password" });
                return;
            }

            res.status(200).json({ msg: "Login successful", user: { id: user.id, name: user.name, username: user.username } });
        }
    );
};