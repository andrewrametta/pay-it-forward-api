function makeUsersArray() {
  return [
    {
      username: "testuser1",
      password: "P@ssword1234",
      email: "testuser1@email.com",
      date_created: "2021-03-16T13:30:06.300Z",
      user_type: "user",
      address: "101 st lane",
      city: "Tampa",
      state: "FL",
      zip: "33609",
      user_url: "testimage.com",
      user_status: "active",
    },
    {
      username: "testuser2",
      password: "P@ssword2468",
      email: "testuser2@email.com",
      date_created: "2021-03-16T13:30:06.300Z",
      user_type: "user",
      address: "102 st lane",
      city: "Tampa",
      state: "FL",
      zip: "33609",
      user_url: "testimage.com",
      user_status: "active",
    },
    {
      username: "testorg1",
      password: "P@ssword3690",
      email: "testorg1@email.com",
      date_created: "2021-03-16T13:30:06.300Z",
      user_type: "org",
      address: "103 st lane",
      city: "Tampa",
      state: "FL",
      zip: "33609",
      user_url: "testimage.com",
      user_status: "active",
    },
  ];
}

module.exports = makeUsersArray;
