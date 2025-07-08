const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "add blog" }).click();

  await page.getByPlaceholder("Write title here").fill(title);
  await page.getByPlaceholder("Write author here").fill(author);
  await page.getByPlaceholder("Write url here").fill(url);

  await page.getByRole("button", { name: "Create" }).click();
  await page.getByText(title).waitFor();
};

export { loginWith, createBlog };
