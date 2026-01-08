sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser executes JS that adds the new note to the list and sends it to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created {message: "note created"}
    deactivate server