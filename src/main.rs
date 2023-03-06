use rocket::fs::FileServer;

#[rocket::launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    let pages = FileServer::from("./src/pages");

    rocket.mount("/", pages)
}
