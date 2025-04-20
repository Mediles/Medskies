# Unofficial API Documentation - Minehut

## Endpoints

* `/servers`
* `/server/{server-id}`
* `/server/{server-name}?byName=true`
* `/plugins_public`
* `/users/login`
* `/users/ghost_login`
* `/users/signup`
* `/users/confirm_email`
* `/user/{user-id}`
* `/servers/create`
* `/servers/{server-id}/server_data`
* `/server/{server-id}/status`
* `/server/{server-id}/start_service`
* `/server/{server-id}/start`
* `/server/{server-id}/shutdown`
* `/server/{server-id}/destroy_service`
* `/server/{server-id}/repair_files`
* `/server/{server-id}/reset_all`
* `/server/{server-id}/send_command`
* `/server/{server-id}/change_name`
* `/server/{server-id}/change_motd`
* `/server/{server-id}/visibility`
* `/server/{server-id}/save`
* `/server/{server-id}/reset_world`
* `/server/{server-id}/edit_server_properties`
* `/server/{server-id}/plugins`
* `/server/{server-id}/install_plugin`
* `/server/{server-id}/remove_plugin`
* `/v1/server/{server-id}/backups`
* `/v1/server/{server-id}/backup/apply`
* `/v1/server/{server-id}/backup/create`
* `/v1/server/{server-id}/backup`
* `/server/{server-id}/remove_plugin_data`
* `/file/world/upload/{server-id}`
* `/file/upload/{server-id}/{path}`
* `/file/{server-id}/list`
* `/file/{server-id}/list/{path}`
* `/file/{server-id}/read/{file-path}`
* `/file/{server-id}/edit/{file-path}`
* `/file/{server-id}/delete/{file-path}`
* `/file/{server-id}/folder/create`
* `/admin/stats/users/registrations/week`
* `/admin/stats/subscriptions/week`
* `/admin/stats/subscriptions/new/week`
* `/network/stats/joins/week`
* `/network/stats/joins/week/java`
* `/network/stats/joins/week/bedrock`
* `/admin/stats/subscriptions/cancellations/week`
* `/admin/stats/votes/week`
* `/admin/stats/users/registrations/month`
* `/admin/stats/subscriptions/month`
* `/admin/stats/subscriptions/new/month`
* `/network/stats/joins/month`
* `/network/stats/joins/month/java`
* `/network/stats/joins/month/bedrock`
* `/admin/stats/subscriptions/cancellations/month`
* `/admin/stats/votes/month`
* `/network/players/distribution`
* `/website/navbar/promotion`
* `/user/name?byEmail=true`
* `/user/name?byMinecraftName=true`
* `/user/name/add_credits/amount`
* `/user/name/delete_session`
* `/admin/add/name`
* `/admin/gdpr/user`
* `/admin/delete/user`
* `/server/name/destroy_service_admin`
* `/admin/name/suspend`
* `/admin/name/release`
* `/plugins`
* `/plugin/id/edit`
* `/plugin/id/delete`
* `/plugins`
* `/admin/payments/range`
* `/admin/credits/range`
* `/admin/voting/set/reward`
* `/vote/reward`
* `/admin/votes/range`
* `/network/motd`
* `/website/transferring/promotion`

---

## GET /servers

**URL:** `https://api.minehut.com/servers`

**RESPONSE:**

```json
{
    "servers": [
        {
            "_id": "5cb10c8daaa36b18a20641c6",
            "playerCount": 1,
            "online": true,
            "ip": "",
            "port": 0,
            "managerPort": 37661,
            "timeNoPlayers": 0,
            "name": "GoDutch",
            "motd": "A Minehut Server.",
            "maxPlayers": 10,
            "visibility": true,
            "platform": "java",
            "startedAt": 1555106968198,
            "players": [
                "sasquatchboi"
            ],
            "starting": false,
            "stopping": false,
            "exited": false,
            "lastOnlineAt": 1555107100422,
            "status": "ONLINE",
            "updated": 1555107100422
        },
        {
            "_id": "5c6f3ca5b66d3c55a20364d3",
            "playerCount": 1,
            "online": true,
            "ip": "",
            "port": 0,
            "managerPort": 39915,
            "timeNoPlayers": 0,
            "name": "REAGANZK3L",
            "motd": "A Minehut Server.",
            "maxPlayers": 10,
            "visibility": true,
            "platform": "java",
            "startedAt": 1555105610159,
            "players": [
                "Abby_Cakes"
            ],
            "starting": false,
            "stopping": false,
            "exited": false,
            "lastOnlineAt": 1555107100621,
            "status": "ONLINE",
            "updated": 1555107100621
        }...
    ]
}
```

**Description:** Returns all online player servers.
**Authorization:** Doesn't require authorization.

---

## GET /server/{server-id}

**URL:** `https://api.minehut.com/server/{server-id}`

**RESPONSE:**

```json
{
    "server": {
        "credits_per_day": 0,
        "_id": "5ca516996eb6c04369419302",
        "owner": "5bccb1105f9a3201b7d18341",
        "name": "Tabanata",
        "name_lower": "tabanata",
        "creation": 1554323097802,
        "platform": "java",
        "storage_node": "s1",
        "__v": 0,
        "port": -1,
        "key": "ae53981221095a79863632f3753ea9ebaf955f31",
        "last_online": 1555091000155,
        "motd": "&7The Minehut panel ingame!",
        "visibility": false,
        "server_properties": {
            "resource_pack": "",
            "level_name": "world",
            "level_seed": "",
            "difficulty": 1,
            "hardcore": false,
            "allow_flight": false,
            "generator_settings": "",
            "spawn_mobs": false,
            "spawn_animals": false,
            "allow_nether": false,
            "generate_structures": false,
            "gamemode": 2,
            "force_gamemode": true,
            "max_players": 10,
            "level_type": "FLAT",
            "announce_player_achievements": false,
            "enable_command_block": true,
            "pvp": false
        },
        "suspended": false,
        "active_plugins": [
            "5a42c0de69957f3d220592e9",
            "5cabaf1ca8b6db60f425e53a",
            "5a42c29c69957f3d220592ef",
            "5c3533ab299bc02b597d60fd",
            "5a42c13269957f3d220592ea",
            "5a42c30069957f3d220592f0",
            "5a42c19769957f3d220592ec"
        ],
        "purchased_plugins": []
    }
}
```

**Description:** Returns information about a server using the ID provided.
**Authorization:** Doesn't require authorization.

---

## GET /server/{server-name}?byName=true

**URL:** `https://api.minehut.com/server/{server-name}?byName=true`

**Description:** Returns information about a server using the name provided.
**Authorization:** Doesn't require authorization.

---

## GET /plugins_public

**URL:** `https://api.minehut.com/plugins_public`

**RESPONSE:**

```json
{
    "all": [
        {
            "_id": "5a42ba4846246d33fa64c625",
            "name": "Essentials",
            "credits": 0,
            "platform": "java",
            "desc": "Essential commands",
            "desc_extended": "",
            "version": "2.15.0.1",
            "disabled": false,
            "file_name": "Essentials.jar",
            "config_file_name": "",
            "__v": 0,
            "created": 1536882007186,
            "last_updated": 1552068718798
        }...
    ],
    "bedrock": [
        {
            "_id": "5a1644e734fe6fad3dcb1903",
            "name": "FactionsPro",
            "credits": 0,
            "platform": "bedrock",
            "description": "Create your Faction, Claim your Land, Fight your Enemies!",
            "version": "1.3.11",
            "file_name": "FactionsPro.phar",
            "disabled": false,
            "desc": "Create your faction, Claim your Land, Fight your Enemies!",
            "desc_extended": "With this plugin players group up in Factions. You **claim land** as your own and **build your base**...",
            "config_file_name": "",
            "created": 1511327459335,
            "last_updated": 1549113504433
        }
    ]
}
```

**Description:** (Deprecated) Returns all available Minehut plugins.
**Authorization:** Doesn't require authorization.

---

## POST /users/login

**URL:** `https://api.minehut.com/users/login`

**REQUEST BODY:**

```json
{"email":"spongebob@squarep.ants","password":"ILiveInAPineappleUnderTheSea404"}
```

**RESPONSE:**

```json
{
    "_id":"5bccb1105f9a3201b7d18341",
    "token":"00w0-14v4-h33h33-p3d0",
    "servers": [
        "5bccb1a8bb9a640173720586",
        "5ca516996eb6c04369419302"
    ]
}
```

**Description:** (Deprecated) Logins with the provided credentials and returns the token, session id, and servers of the user.
**Authorization:** Doesn't require authorization.

---

## POST /users/ghost_login

**URL:** `https://api.minehut.com/users/ghost_login`

**Description:** (Deprecated) Returns the same data as /users/login, but instead of using login credentials, it uses a token and session id.
**Authorization:** Requires authorization.

---

## POST /users/signup

**URL:** `https://api.minehut.com/users/signup`

**REQUEST BODY:**

```json
{"email":"spongebob@squarep.ants","birthday":"1986-01-02T00:05:40.082Z"}
```

**Description:** (Deprecated) Create a new Minehut account with the email and birth date, also sends a verification code to the provided email.
**Authorization:** Doesn't require authorization.

---

## POST /users/confirm_email

**URL:** `https://api.minehut.com/users/confirm_email`

**REQUEST BODY:**

```json
{"email_code":"P1N34PPL3","password":"P@ssw0rd1234"}
```

**Description:** (Deprecated) Verifies an account using the provided email code and sets a password for the account.
**Authorization:** Doesn't require authorization.

---

## GET /user/{user-id}

**URL:** `https://api.minehut.com/user/{user-id}`

**RESPONSE:**

```json
{
	"user": {
		"credits": 0,
		"_id": "5cb11bff5c3ebc1955c33852",
		"email": "spongebob@squarep.ants",
		"email_verified": true,
		"email_sent_at": 1555110621197,
		"created_at": 1555110621060,
		"birthday": "1992-01-02T00:10:25.612Z",
		"__v": 0,
		"email_code": "e3il0",
		"last_password_change": 1555110670755,
		"token": "12c90781-738e-4c62-a53b-bc88b25f759b",
		"last_login": 1555169889763,
		"servers": ["5cb11d898c3ebc1969c33858"]
	}
}
```

**Description:** Returns information about a Minehut user.
**Authorization:** Requires authorization.

---

## POST /servers/create

**URL:** `https://api.minehut.com/servers/create`

**REQUEST BODY:**

```json
{"name":"MyServer","platform":"java"}
```

**Description:** Creates a new server on the specified account (maximum of 2).
**Authorization:** Requires authorization.

---

## GET /servers/{server-id}/server_data

**URL:** `https://api.minehut.com/servers/{server-id}/server_data`

**Description:** Returns similar information to /server/{server-id}.
**Authorization:** Requires authorization.

---

## GET /server/{server-id}/status

**URL:** `https://api.minehut.com/server/{server-id}/status`

**Description:** Returns the status of the server (starting, stopping, players online, plugins etc.).
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/start_service

**URL:** `https://api.minehut.com/server/{server-id}/start_service`

**Description:** Takes the server out of hibernation and starts it.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/start

**URL:** `https://api.minehut.com/server/{server-id}/start`

**Description:** Starts the server if it's not in hibernation.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/shutdown

**URL:** `https://api.minehut.com/server/{server-id}/shutdown`

**Description:** Stops the server, but doesn't hibernate it.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/destroy_service

**URL:** `https://api.minehut.com/server/{server-id}/destroy_service`

**Description:** Stops the server and hibernates it.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/repair_files

**URL:** `https://api.minehut.com/server/{server-id}/repair_files`

**Description:** Attempts to repair the server's core files.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/reset_all

**URL:** `https://api.minehut.com/server/{server-id}/reset_all`

**Description:** Completely resets the server (Erases all files on it).
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/send_command

**URL:** `https://api.minehut.com/server/{server-id}/send_command`

**REQUEST BODY:**

```json
{"command":"/say Hello World!"}
```

**Description:** Runs a console command to the server.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/change_name

**URL:** `https://api.minehut.com/server/{server-id}/change_name`

**REQUEST BODY:**

```json
{"name":"MyServer2.0"}
```

**Description:** Changes the servers name. Error 400 if the name is already taken.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/change_motd

**URL:** `https://api.minehut.com/server/{server-id}/change_motd`

**REQUEST BODY:**

```json
{"command":"&6Ooo, &athis is nice!"}
```

**Description:** Changes the MOTD of the server.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/visibility

**URL:** `https://api.minehut.com/server/{server-id}/visibility`

**REQUEST BODY:**

```json
{"visibility":"true/false"}
```

**Description:** Changes whether your server appears in the server list.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/save

**URL:** `https://api.minehut.com/server/{server-id}/save`

**Description:** Saves the server's world.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/reset_world

**URL:** `https://api.minehut.com/server/{server-id}/reset_world`

**Description:** Resets the server's world with a new seed.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/edit_server_properties

**URL:** `https://api.minehut.com/server/{server-id}/edit_server_properties`

**REQUEST BODY:**

```json
{"field":"See below for possible values", "value":"A value pertaining to the field"}
```

**Description:** Changes values in the server.properties file.
Possible fields are max_players, level_type, level_name, generator_settings, gamemode, force_gamemode, pvp, spawn_mobs, spawn_animals, allow_flight, generator_settings, difficulty, hardcore, enable_command_block, announce_player_achievements, allow_nether, generate_structures, and resource_pack.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/plugins

**URL:** `https://api.minehut.com/server/{server-id}/plugins`

**RESPONSE:**

```json
{
	"plugins": [{
		"state": "PURCHASED",
		"_id": "5a42ba4846246d33fa64c625",
		"name": "Essentials",
		"credits": 0,
		"platform": "java",
		"desc": "Essential commands",
		"desc_extended": "",
		"version": "2.15.0.1",
		"disabled": false,
		"file_name": "Essentials.jar",
		"config_file_name": "",
		"__v": 0,
		"created": 1536882007186,
		"last_updated": 1552068718798
	},
	...
	{
		"state": "PURCHASED",
		"_id": "5a42bb0246246d33fa64c627",
		"name": "EssentialsChat",
		"credits": 0,
		"platform": "java",
		"desc": "Format the chat to make it look nicer.",
		"desc_extended": "Requires Vault",
		"version": "2.15.0.1",
		"disabled": false,
		"file_name": "EssentialsChat.jar",
		"config_file_name": "",
		"__v": 0,
		"created": 1536882039069,
		"last_updated": 1536882039069
	}]
}
```

**Description:** Returns all the plugins and whether they are installed or not.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/install_plugin

**URL:** `https://api.minehut.com/server/{server-id}/install_plugin`

**REQUEST BODY:**

```json
{"plugin":"5a42ba4846246d33fa64c625"}
```

**Description:** Installs a plugin onto the server.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/remove_plugin

**URL:** `https://api.minehut.com/server/{server-id}/remove_plugin`

**REQUEST BODY:**

```json
{"plugin":"5a42ba4846246d33fa64c625"}
```

**Description:** Removes a plugin from the server.
**Authorization:** Requires authorization.

---

## GET /v1/server/{server-id}/backups

**URL:** `https://api.minehut.com/v1/server/{server-id}/backups`

**RESPONSE:**

```json
{
  "backups": [
    {
      "deleted": false,
      "disabled": false,
      "data_removed": false,
      "_id": "6009decbdbdc82009fff6b5c",
      "server_id": "5fde35543e617f009c88b416",
      "description": "",
      "server_model_snapshot": {
        "server_properties": {
          ...
        },
        "purchased_plugins": [

        ],
        "active_plugins": [
          ...
        ],
        "purchased_icons": [
          "5eb9c175b04a8c1b6b4a1fa4"
        ],
        "backup_slots": 0,
        "suspended": false,
        "installed_content_packs": [

        ],
        ... (generic data of /server/{server-id})
      },
      "last_backup_time": 1611259595154,
      "__v": 0,
      "content": {

      },
      "pending": false
    }
  ],
  "rolling_backup": {
    "size": 17006740,
    "metaData": {
      "content-type": "application/octet-stream",
      "mtime": "1612032498.213216858"
    },
    "lastModified": "2021-01-30T18:48:18.000Z",
    "etag": "5b9ef31f581da8008ec46fef8f0be925",
    "last_backup_time": "2021-01-30T18:48:18.000Z",
    "_id": "5fde35543e617f009c88b416"
  }
}
```

**Description:** Retrieve a list of server backups.
**Authorization:** Requires authorization.

---

## POST /v1/server/{server-id}/backup/apply

**URL:** `https://api.minehut.com/v1/server/{server-id}/backup/apply`

**REQUEST BODY:**

```json
{"backup_id":"ID of backup"}
```

**Description:** Apply an existing backup to a server.
**Authorization:** Requires authorization.

---

## POST /v1/server/{server-id}/backup/create

**URL:** `https://api.minehut.com/v1/server/{server-id}/backup/create`

**REQUEST BODY:**

```json
{"backup_id":"ID of backup"}
```

**Description:** Create a new backup.
**Authorization:** Requires authorization.

---

## DELETE /v1/server/{server-id}/backup

**URL:** `https://api.minehut.com/v1/server/{server-id}/backup`

**REQUEST BODY:**

```json
{"backup_id":"ID of backup"}
```

**Description:** Delete an existing backup.
**Authorization:** Requires authorization.

---

## POST /server/{server-id}/remove_plugin_data

**URL:** `https://api.minehut.com/server/{server-id}/remove_plugin_data`

**REQUEST BODY:**

```json
{"plugin":"5a42ba4846246d33fa64c625"}
```

**Description:** Resets a plugin's configuration file.
**Authorization:** Requires authorization.

---

## POST /file/world/upload/{server-id}

**URL:** `https://api.minehut.com/file/world/upload/{server-id}`

**REQUEST BODY:**

```json
{"file": "File (binary)"}
```

**Description:** Uploads a .zip world to the server.
**Authorization:** Requires authorization.

---

## POST /file/upload/{server-id}/{path}

**URL:** `https://api.minehut.com/file/upload/{server-id}/{path}`

**REQUEST BODY:**

```json
{"file": "File (binary)"}
```

**Description:** Uploads a file to the server.
**Authorization:** Requires authorization.

---

## GET /file/{server-id}/list

**URL:** `https://api.minehut.com/file/{server-id}/list`

**RESPONSE:**

```json
{
	"files": [{
		"name": "banned-ips.json",
		"directory": false,
		"blocked": false
	}, {
		"name": "banned-players.json",
		"directory": false,
		"blocked": false
	}, {
		"name": "bukkit.yml",
		"directory": false,
		"blocked": false
	}, {
		"name": "commands.yml",
		"directory": false,
		"blocked": false
	},
  	...
  	{
		"name": "whitelist.json",
		"directory": false,
		"blocked": false
	}, {
		"name": "world",
		"directory": true,
		"blocked": true
	}, {
		"name": "world_nether",
		"directory": true,
		"blocked": true
	}, {
		"name": "world_the_end",
		"directory": true,
		"blocked": true
	}]
}
```

**Description:** Returns all the files and folders in the server's root.
**Authorization:** Requires authorization.

---

## GET /file/{server-id}/list/{path}

**URL:** `https://api.minehut.com/file/{server-id}/list/{path}`

**RESPONSE:**

```json
{
	"files": [{
		"name": "banned-ips.json",
		"directory": false,
		"blocked": false
	}, {
		"name": "banned-players.json",
		"directory": false,
		"blocked": false
	}, {
		"name": "bukkit.yml",
		"directory": false,
		"blocked": false
	}, {
		"name": "commands.yml",
		"directory": false,
		"blocked": false
	},
  	...
  	{
		"name": "whitelist.json",
		"directory": false,
		"blocked": false
	}, {
		"name": "world",
		"directory": true,
		"blocked": true
	}, {
		"name": "world_nether",
		"directory": true,
		"blocked": true
	}, {
		"name": "world_the_end",
		"directory": true,
		"blocked": true
	}]
}
```

**Description:** Returns all the files and folders in the provided path.
**Authorization:** Requires authorization.

---

## GET /file/{server-id}/read/{file-path}

**URL:** `https://api.minehut.com/file/{server-id}/read/{file-path}`

**RESPONSE:**

```json
{
	"content": "The contents of the file will be in here"
}
```

**Description:** Returns the contents of the provided file.
**Authorization:** Requires authorization.

---

## POST /file/{server-id}/edit/{file-path}

**URL:** `https://api.minehut.com/file/{server-id}/edit/{file-path}`

**REQUEST BODY:**

```json
{"content":"This text will overwrite whatever is inside the file"}
```

**Description:** Edits a file and saves it with the provided content (~4GB max). This also creates a file if one does not exist (provide a blank content for a blank file).
**Authorization:** Requires authorization.

---

## POST /file/{server-id}/delete/{file-path}

**URL:** `https://api.minehut.com/file/{server-id}/delete/{file-path}`

**Description:** Deletes a file.
**Authorization:** Requires authorization.

---

## POST /file/{server-id}/folder/create

**URL:** `https://api.minehut.com/file/{server-id}/folder/create`

**REQUEST BODY:**

```json
{"name":"MyFolder","directory":"world"}
```

**Description:** Creates a new folder in the provided directory.
**Authorization:** Requires authorization.

---

## GET /admin/stats/users/registrations/week

**URL:** `https://api.minehut.com/admin/stats/users/registrations/week`

**Description:** Returns the amount of weekly user registrations.
**Authorization:** Requires authorization.

---

## GET /admin/stats/subscriptions/week

**URL:** `https://api.minehut.com/admin/stats/subscriptions/week`

**Description:** Returns the amount of weekly subscriptions.
**Authorization:** Requires authorization.

---

## GET /admin/stats/subscriptions/new/week

**URL:** `https://api.minehut.com/admin/stats/subscriptions/new/week`

**Description:** Returns the amount of new weekly subscriptions.
**Authorization:** Requires authorization.

---

## GET /network/stats/joins/week

**URL:** `https://api.minehut.com/network/stats/joins/week`

**Description:** Returns the amount of weekly joins total.
**Authorization:** Requires authorization.

---

## GET /network/stats/joins/week/java

**URL:** `https://api.minehut.com/network/stats/joins/week/java`

**Description:** Returns the amount of weekly joins from Minecraft: Java Edition.
**Authorization:** Requires authorization.

---

## GET /network/stats/joins/week/bedrock

**URL:** `https://api.minehut.com/network/stats/joins/week/bedrock`

**Description:** Returns the amount of weekly joins from Minecraft: Bedrock Edition.
**Authorization:** Requires authorization.

---

## GET /admin/stats/subscriptions/cancellations/week

**URL:** `https://api.minehut.com/admin/stats/subscriptions/cancellations/week`

**Description:** Returns the amount of weekly subscription cancellations.
**Authorization:** Requires authorization.

---

## GET /admin/stats/votes/week

**URL:** `https://api.minehut.com/admin/stats/votes/week`

**Description:** Returns the amount of weekly votes.
**Authorization:** Requires authorization.

---

## GET /admin/stats/users/registrations/month

**URL:** `https://api.minehut.com/admin/stats/users/registrations/month`

**Description:** Returns the amount of monthly user registrations.
**Authorization:** Requires authorization.

---

## GET /admin/stats/subscriptions/month

**URL:** `https://api.minehut.com/admin/stats/subscriptions/month`

**Description:** Returns the amount of monthly subscriptions.
**Authorization:** Requires authorization.

---

## GET /admin/stats/subscriptions/new/month

**URL:** `https://api.minehut.com/admin/stats/subscriptions/new/month`

**Description:** Returns the amount of new monthly subscriptions.
**Authorization:** Requires authorization.

---

## GET /network/stats/joins/month

**URL:** `https://api.minehut.com/network/stats/joins/month`

**Description:** Returns the amount of monthly joins total.
**Authorization:** Requires authorization.

---

## GET /network/stats/joins/month/java

**URL:** `https://api.minehut.com/network/stats/joins/month/java`

**Description:** Returns the amount of monthly joins from Minecraft: Java Edition.
**Authorization:** Requires authorization.

---

## GET /network/stats/joins/month/bedrock

**URL:** `https://api.minehut.com/network/stats/joins/month/bedrock`

**Description:** Returns the amount of monthly joins from Minecraft: Bedrock Edition.
**Authorization:** Requires authorization.

---

## GET /admin/stats/subscriptions/cancellations/month

**URL:** `https://api.minehut.com/admin/stats/subscriptions/cancellations/month`

**Description:** Returns the amount of monthly subscription cancellations.
**Authorization:** Requires authorization.

---

## GET /admin/stats/votes/month

**URL:** `https://api.minehut.com/admin/stats/votes/month`

**Description:** Returns the amount of monthly votes.
**Authorization:** Requires authorization.

---

## GET /network/players/distribution

**URL:** `https://api.minehut.com/network/players/distribution`

**Description:** Returns the player distribution.
**Authorization:** Requires authorization.

---

## POST /website/navbar/promotion

**URL:** `https://api.minehut.com/website/navbar/promotion`

**Description:** Update the navigation bar promotion in the top right of the panel.
**Authorization:** Requires authorization.

---

## GET /user/name?byEmail=true

**URL:** `https://api.minehut.com/user/name?byEmail=true`

**Description:** Get user information from email.
**Authorization:** Requires authorization.

---

## GET /user/name?byMinecraftName=true

**URL:** `https://api.minehut.com/user/name?byMinecraftName=true`

**Description:** Get user information from Minecraft IGN.
**Authorization:** Requires authorization.

---

## POST /user/name/add_credits/amount

**URL:** `https://api.minehut.com/user/name/add_credits/amount`

**Description:** Add credits to a user.
**Authorization:** Requires authorization.

---

## POST /user/name/delete_session

**URL:** `https://api.minehut.com/user/name/delete_session`

**Description:** Delete a user's session.
**Authorization:** Requires authorization.

---

## POST /admin/add/name

**URL:** `https://api.minehut.com/admin/add/name`

**Description:** Add a user to the Admin Panel.
**Authorization:** Requires authorization.

---

## POST /admin/gdpr/user

**URL:** `https://api.minehut.com/admin/gdpr/user`

**Description:** Does a GDPR dump for a user.
**Authorization:** Requires authorization.

---

## POST /admin/delete/user

**URL:** `https://api.minehut.com/admin/delete/user`

**Description:** Delete a user's account.
**Authorization:** Requires authorization.

---

## POST /server/name/destroy_service_admin

**URL:** `https://api.minehut.com/server/name/destroy_service_admin`

**Description:** Force hibernate a server from the Admin Panel.
**Authorization:** Requires authorization.

---

## POST /admin/name/suspend

**URL:** `https://api.minehut.com/admin/name/suspend`

**Description:** Suspend a server.
**Authorization:** Requires authorization.

---

## POST /admin/name/release

**URL:** `https://api.minehut.com/admin/name/release`

**Description:** Lift a server's suspension.
**Authorization:** Requires authorization.

---

## GET /plugins

**URL:** `https://api.minehut.com/plugins`

**Description:** Returns full list of plugins.
**Authorization:** Requires authorization.

---

## POST /plugin/id/edit

**URL:** `https://api.minehut.com/plugin/id/edit`

**Description:** Edit information for a plugin.
**Authorization:** Requires authorization.

---

## POST /plugin/id/delete

**URL:** `https://api.minehut.com/plugin/id/delete`

**Description:** Delete a plugin from Minehut.
**Authorization:** Requires authorization.

---

## POST /plugins

**URL:** `https://api.minehut.com/plugins`

**Description:** Add a plugin to Minehut.
**Authorization:** Requires authorization.

---

## POST /admin/payments/range

**URL:** `https://api.minehut.com/admin/payments/range`

**Description:** Update payment ranges for credits.
**Authorization:** Requires authorization.

---

## POST /admin/credits/range

**URL:** `https://api.minehut.com/admin/credits/range`

**Description:** Update credit ranges for the shop.
**Authorization:** Requires authorization.

---

## POST /admin/voting/set/reward

**URL:** `https://api.minehut.com/admin/voting/set/reward`

**Description:** Update the credits vote award.
**Authorization:** Requires authorization.

---

## GET /vote/reward

**URL:** `https://api.minehut.com/vote/reward`

**Description:** Retrieve the current vote reward.
**Authorization:** Requires authorization.

---

## POST /admin/votes/range

**URL:** `https://api.minehut.com/admin/votes/range`

**Description:** Update the voting range.
**Authorization:** Requires authorization.

---

## POST /network/motd

**URL:** `https://api.minehut.com/network/motd`

**Description:** Update the Bungeecord MOTD.
**Authorization:** Requires authorization.

---

## GET /website/transferring/promotion

**URL:** `https://api.minehut.com/website/transferring/promotion`

**RESPONSE:**

```json
{
	"video_id":"",
	"autoplay":null,
	"use_cloudinary":true
}
```

**Description:** Retrieve the current promotion video.
**Authorization:** Requires authorization.