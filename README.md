## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string||
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :groups, through: groups_users
- has_many :groups_users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|group_id|integer|null:false, foregin_key:true|
|user_id|integer|null:false, foregin_key:true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null:false, foregin_key:true|

### Association
- has_many :groups_users
- has_many :users

