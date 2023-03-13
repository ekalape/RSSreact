async function getUsers() {
  /*   const res = await fetch(
      'https://dummyjson.com/users?limit=50&select=firstName,lastName,age,gender,height,eyeColor,image,hair,birthDate,address',
    ); */
  const res = await fetch('../../public/users.json');
  const users = await res.json();
  return users;
}
export default getUsers;
