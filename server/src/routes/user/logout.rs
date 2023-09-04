use actix_web::HttpResponse;

use crate::session_state::TypedSession;

pub async fn logout(session: TypedSession) -> HttpResponse {
    session.logout();
    HttpResponse::Ok().finish()
}
