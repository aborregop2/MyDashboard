//TODO: Dialog delete         - OK
//TODO: Install Nunito font   - OK
//TODO: Only one burguer      - OK
//TODO: <a> to <Link>         - OK
//TODO: Quitar Darkmodes      - OK
//TODO: Bug dashboard sidebar - OK

export const createUser = async (user: any) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BDD_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BDD_URL}/users`);
        console.log(import.meta.env.BDD_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const updateUser = (user: any) => {
    return fetch(`${import.meta.env.VITE_BDD_URL}/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .catch(error => console.error("Error updating user:", error));
}

export const deleteUser = (userId: string) => {
    return fetch(`${import.meta.env.VITE_BDD_URL}/users/${userId}`, {
        method: "DELETE",
    })
    .catch(error => console.error("Error deleting user:", error));
}