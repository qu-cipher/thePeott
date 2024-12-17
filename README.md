
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

# ThePeott Official Repository (Backend branch)

This is ThePeott Telegram App's official repository. ❗❗ **NOT FINISHED** ❗❗


## JPA Entities

| **Data Fields \ Entity Name** |        **Player**        |
|:-----------------------------:|:------------------------:|
|               *               |   telegramId \| _long_   |
|               *               |   username \| _String_   |
|               *               |   avatarUrl \| _String_  |
|               *               |  inviteCode \| _String_  |
|               *               |    refCode \| _String_   |
|               *               |    region \| _Region_    |
|               *               | friends \| _Set<Player>_ |
|               *               |    engine \| _Engine_    |
|               *               |   balance \| _Balance_   |

## API Reference

#### Register Player

```http
POST ~/api/player/register
```

| **Body Item** | **Value type** | **Required** |       **Info.**      |
|:-------------:|:--------------:|:------------:|:--------------------:|
|   telegramId  |     _long_     |       ✓      |          *            |
|    username   |    _String_    |       ✓      |          *            |
|   avatar_url  |    _String_    |       ✓      |           *           |
|    refCode    |    _String_    |       ✓      | Inviter's inviteCode |
|     Region    |    _String_    |       ✓      |           *           |


#### Update Player Data
```http
POST ~/api/player/update
```
|   **Body Item**  | **Value Type** | **Required** |                   **Info.**                  |
|:----------------:|:--------------:|:------------:|:--------------------------------------------:|
| playerTelegramId |     _long_     |       ✓      | Player's Id that is going to change its data |
|    toUsername    |    _String_    |       ✓      |                       *                      |
|     toAvatar     |    _String_    |       ✓      |                       *                      |
|     toRegion     |    _String_    |       ✓      |                       *                      |

#### Get (Recieve) player data
```http
GET ~/api/player/get
```
| **Request Param** | **Value Type** | **Required** |                **Info.**               |
|:-----------------:|:--------------:|:------------:|:--------------------------------------:|
|         id        |     _long_     |       ✓      | Player's telegram id to get id from it |



## CommandLine

| **Command Name** |             **Usage**             |         **Info.**         |
|:----------------:|:---------------------------------:|:-------------------------:|
|       help       |               _help_              |  Shows available commands |
|       stop       |               _stop_              |    Stops the whole app    |
|        say       |       _say [String message]_      |   Same as `echo` command  |
|    Ban Player    | _ban_player [player-telegram-id]_ |       Bans a player       |
|  Suspend Player  | _sus_player [player-telegram-id]_ |     Suspends a player     |
|  Activate Player | _act_player [player-telegram-id]_ | Unban/Unsuspends a player |


## License

[GNU General Public License](https://opensource.org/license/gpl-3-0)
