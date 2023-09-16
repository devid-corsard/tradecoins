use secrecy::Secret;
use unicode_segmentation::UnicodeSegmentation;

pub struct NewUser {
    pub username: Username,
    pub password: Password,
}

pub struct Username(String);

impl Username {
    pub fn parse(s: String) -> Result<Self, String> {
        let min_username_length = 5;
        let forbidden_characters = ['/', '(', ')', '"', '<', '>', '\\', '{', '}'];
        match s {
            s if s.len() < min_username_length => Err(format!(
                "Username length must be at least {} characters long",
                min_username_length
            )),
            s if s.trim().is_empty() => {
                Err("Username can't be empty or contain whitespaces only".to_string())
            }
            s if s.graphemes(true).count() > 256 => Err("Username is too long".to_string()),
            s if s.chars().any(|g| forbidden_characters.contains(&g)) => {
                Err("Username contains forbidden characters".to_string())
            }
            _ => Ok(Self(s)),
        }
    }
}

impl AsRef<str> for Username {
    fn as_ref(&self) -> &str {
        &self.0
    }
}

pub struct Password(Secret<String>);

impl Password {
    pub fn parse(s: String) -> Result<Self, String> {
        let min_password_length = 8;
        match s {
            s if s.len() < min_password_length => Err(format!(
                "Password length must be at least {} characters long",
                min_password_length
            )),
            s if s.trim().is_empty() => {
                Err("Password can't be empty or contain whitespaces only".to_string())
            }
            s if s.graphemes(true).count() > 256 => Err("Password is too long".to_string()),
            _ => Ok(Self(Secret::new(s))),
        }
    }
}

impl AsRef<Secret<String>> for Password {
    fn as_ref(&self) -> &Secret<String> {
        &self.0
    }
}
