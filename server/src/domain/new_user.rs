pub struct NewUser {
    pub username: Username,
    pub password: Password,
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

pub struct Password(String);

impl Password {
    pub fn parse(s: String) -> Result<Self, String> {
        Ok(Self(s))
    }
}

impl AsRef<str> for Password {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
