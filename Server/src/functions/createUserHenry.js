const { User, Sede } = require("../DB_connection");

async function createUserHenry() {
  try {
    // Crear la sede (Branch)
    const [sedeCreated, created] = await Sede.findOrCreate({
      where: {
        branchName: "Restrepo",
        address: "direccion",
        phoneNumber: "numero",
      },
    });

    // Crear el usuario (User)
    const [existingUserHenry, userCreated] = await User.findOrCreate({
      where: {
        userName: "loshenry2023@gmail.com",
        notificationEmail: "loshenry2023@gmail.com",
        name: "LosHenry",
        lastName: "2023",
        phoneNumber1: "111111111",
        image:
          "https://res.cloudinary.com/dvptbowso/image/upload/v1701979529/HenryPF/ses9qbgrnytwd9l1ovcu.png",
        comission: 0,
        role: "superAdmin",
      },
    });

    // Relacionar el usuario con la sede
    if (userCreated && sedeCreated) {
      await existingUserHenry.setBranch(sedeCreated);
      console.log("User 'LosHenry' associated with branch 'Restrepo' created.");
    } else {
      console.log("User or branch already existed.");
    }
  } catch (error) {
    console.error("Error creating user or branch:", error);
    throw error;
  }
}

module.exports = createUserHenry;
