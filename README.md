# Two minute drill

## Database Schema Design

![db-schema]

[db-schema]: ./images/image.png

## API Documentation

## CONTESTS

### Get all Contests

returns all the contests.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/contests
  * Body: none

* Successful Response
 * Status Code: 200
 * Headers:
  * Content-Type: application/json
 * Body:

  ```json
  {
    "Contests": [
    {
        "id": 1,
        "host_id": 1,
        "description": "test",
        "closing_date": "12/17/1995, 03:24:00",
        "preview_image": "url",
        "createdAt": "08/26/2024, 21:52:51",
        "updatedAt": "08/26/2024, 21:52:51"
    },
    {
        "id": 2,
        "host_id": 1,
        "description": "test2",
        "closing_date": "12/17/1995, 03:24:00",
        "preview_image": "url",
        "createdAt": "08/26/2024, 21:52:51",
        "updatedAt": "08/26/2024, 21:52:51"
    },
    {
        "id": 3,
        "host_id": 2,
        "description": "test3",
        "closing_date": "12/17/1995, 03:24:00",
        "preview_image": "url",
        "createdAt": "08/26/2024, 21:52:51",
        "updatedAt": "08/26/2024, 21:52:51"
    },
    {
        "id": 4,
        "host_id": 1,
        "description": "testing the description here.",
        "closing_date": "08/05/2025, 24:00:00",
        "preview_image": "image_url",
        "createdAt": "08/27/2024, 14:41:37",
        "updatedAt": "08/27/2024, 14:41:37"
    },
    {
        "id": 5,
        "host_id": 1,
        "description": "testing the description here.",
        "closing_date": "08/05/2025, 24:00:00",
        "preview_image": "image_url",
        "createdAt": "08/27/2024, 14:42:03",
        "updatedAt": "08/27/2024, 14:42:03"
    },
    {
        "id": 6,
        "host_id": 1,
        "description": "testing the description here.",
        "closing_date": "08/05/2025, 24:00:00",
        "preview_image": "image_url",
        "createdAt": "08/27/2024, 14:43:21",
        "updatedAt": "08/27/2024, 14:43:21"
    },
    {
        "id": 7,
        "host_id": 1,
        "description": "testing the description here.",
        "closing_date": "08/05/2025, 24:00:00",
        "preview_image": "image_url",
        "createdAt": "08/27/2024, 14:43:33",
        "updatedAt": "08/27/2024, 14:43:33"
    },
    {
        "id": 8,
        "host_id": 1,
        "description": "testing the description here.",
        "closing_date": "08/05/2025, 12:00:00",
        "preview_image": "image_url",
        "createdAt": "08/27/2024, 14:43:54",
        "updatedAt": "08/27/2024, 14:43:54"
    }
    ]
    }
```

### Get all Contests hosted by the Current User

Returns all the contests.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/contests/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
* Body:

    ```json
    {
        "Contests": [
            {
                "id": 1,
                "host_id": 1,
                "description": "test",
                "closing_date": "12/17/1995, 03:24:00",
                "preview_image": "url",
                "createdAt": "08/26/2024, 21:52:51",
                "updatedAt": "08/26/2024, 21:52:51"
            }
        ]
    }
    ```

### Get details of a Contest from an id

Returns the details of a contest specified by its id.

* Require Authentication: false
* Request
 * Method: GET
  * URL: /api/contests/:contestId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

   ```json
   {
    "id": 1,
    "host_id": 1,
    "description": "test",
    "closing_date": "12/17/1995, 03:24:00",
    "preview_image": "url",
    "createdAt": "08/26/2024, 21:52:51",
    "updatedAt": "08/26/2024, 21:52:51",
    "numPredictions": 1,
    "Predictions": [
        {
            "id": 1,
            "type": "over/under",
            "content": "Chargers 17.5 week 6"
        }
    ]
    }
