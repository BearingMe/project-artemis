use rocket::fs::FileServer;

#[rocket::launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    let templates = FileServer::from("./src/templates");

    rocket.mount("/", templates)
}
