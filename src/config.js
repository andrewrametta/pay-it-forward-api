module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "pay-it-forward-jwt",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://Metta@localhost/pay_it_forward",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://Metta@localhost/pay-it-forward-test",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:8200",
};
