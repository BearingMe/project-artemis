#[rocket::get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[rocket::launch]
fn rocket() -> _ {
    let rocket = rocket::build();
    let routes = rocket::routes![index];

    rocket.mount("/", routes)
}
