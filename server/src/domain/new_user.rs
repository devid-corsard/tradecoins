pub struct NewUser {
    pub username: Username,
    pub password_hash: PasswordHash,
}

pub struct Username(String);

impl Username {
    pub fn parse(s: String) -> Result<Self, String> {
        Ok(Self(s))
    }
}

impl AsRef<str> for Username {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

pub struct PasswordHash(String);

impl PasswordHash {
    pub fn parse(s: String) -> Result<Self, String> {
        Ok(Self(s))
    }
}

impl AsRef<str> for PasswordHash {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
