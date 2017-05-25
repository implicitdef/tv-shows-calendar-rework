function reverse(s: string): string {
    return s.split("").reverse().join("");
}

export const googleClientId = reverse("moc.tnetnocresuelgoog.sppa.8ro4a1m8c1e349slnqhhti7nurp81l2o-412795760244");
export const db = process.env.DATABASE_URL || {
  host: "127.0.0.1",
  user: "manu",
  password: "",
  database: "tv_shows_calendar",
};
export const defaultShowsIds = [
  1399, // Game of Thrones
  1402, // Walking dead
  63247, // Westworld
  66732, // Stranger things
  60059, // Better call saul
  1396, // Breaking bad
  1424, // Orange is the new black
  1412, // Arrow
  2190, // South park
  61733, // Empire
];
export const port = process.env.PORT || 3000;
