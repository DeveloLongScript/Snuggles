plugins {
    kotlin("jvm") version "1.8.0"
    application
}

group = "me.aroze.snuggles"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}

dependencies {
    implementation("com.github.DV8FromTheWorld:JDA:v4.4.0")
    implementation("commons-io:commons-io:2.11.0")
    implementation("com.google.code.gson:gson:2.10.1")
    implementation("com.github.UwUAroze:ArozeUtils:205fe4677d")
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(8)
}

application {
    mainClass.set("me.aroze.snuggles.MainKt")
}