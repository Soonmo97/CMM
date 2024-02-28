CREATE TABLE `User` (
	`user_index`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`id`	VARCHAR(10)	NOT NULL,
	`pw`	VARCHAR(20)	NOT NULL,
	`nickname`	VARCHAR(10)	NOT NULL,
	`email`	VARCHAR(50)	NOT NULL,
	`phone`	VARCHAR(15)	NOT NULL
);

CREATE TABLE `Restaurant` (
	`rest_index`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`category_index`	INTEGER	NOT NULL,
	`rest_name`	VARCHAR(20)	NOT NULL,
	`rating`	INTEGER	NULL,
	`rest_desc`	VARCHAR(255)	NULL,
	`rest_address`	VARCHAR(128)	NOT NULL,
	`rest_number`	VARCHAR(15)	NULL,
	`rest_time`	VARCHAR(128)	NULL,
	`rest_img`	VARCHAR(50)	NULL,
	`latitude`	VARCHAR(150)	NOT NULL,
	`longitude`	VARCHAR(150)	NOT NULL
);

CREATE TABLE `Review` (
	`review_index`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`user_index`	INTEGER	NOT NULL,
	`rest_index`	INTEGER	NOT NULL,
	`category_index`	INTEGER	NOT NULL,
	`review_content`	VARCHAR(255)	NOT NULL,
	`created_at`	DATETIME	NOT NULL
);

CREATE TABLE `Category` (
	`category_index`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`category_name`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `Suggestions` (
	`sug_index`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`user_index`	INTEGER	NOT NULL,
	`title`	VARCHAR(20)	NOT NULL,
	`content`	VARCHAR(255)	NOT NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL
);

CREATE TABLE `LikeList` (
	`like_index`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`user_index`	INTEGER	NOT NULL,
	`rest_index`	INTEGER	NOT NULL,
	`category_index`	INTEGER	NOT NULL
);

CREATE TABLE `Email_Confirm` (
	`email_index`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`user_index`	INTEGER	NOT NULL,
	`expiration`	DATETIME	NULL,
	`secret_key`	VARCHAR(255)	NULL
);

CREATE TABLE `Menu` (
	`menu_id`	INTEGER	AUTO_INCREMENT PRIMARY KEY,
	`rest_index`	INTEGER	NOT NULL,
	`category_index`	INTEGER	NOT NULL,
	`menu`	VARCHAR(30)	NULL,
	`price`	INTEGER	NULL
);

CREATE TABLE `Suggest_like` (
	`suggest_like_index`	INTEGER AUTO_INCREMENT PRIMARY KEY,
	`sug_index`	INTEGER	NOT NULL,
	`user_index`	INTEGER	NOT NULL,
	`user_index2`	INTEGER	NOT NULL
);

ALTER TABLE `User` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_index`
);

ALTER TABLE `Restaurant` ADD CONSTRAINT `PK_RESTAURANT` PRIMARY KEY (
	`rest_index`,
	`category_index`
);

ALTER TABLE `Review` ADD CONSTRAINT `PK_REVIEW` PRIMARY KEY (
	`review_index`,
	`user_index`,
	`rest_index`,
	`category_index`
);

ALTER TABLE `Category` ADD CONSTRAINT `PK_CATEGORY` PRIMARY KEY (
	`category_index`
);

ALTER TABLE `Suggestions` ADD CONSTRAINT `PK_SUGGESTIONS` PRIMARY KEY (
	`sug_index`,
	`user_index`
);

ALTER TABLE `LikeList` ADD CONSTRAINT `PK_LIKELIST` PRIMARY KEY (
	`like_index`,
	`user_index`,
	`rest_index`,
	`category_index`
);

ALTER TABLE `Email_Confirm` ADD CONSTRAINT `PK_EMAIL_CONFIRM` PRIMARY KEY (
	`email_index`,
	`user_index`
);

ALTER TABLE `Menu` ADD CONSTRAINT `PK_MENU` PRIMARY KEY (
	`menu_id`,
	`rest_index`,
	`category_index`
);

ALTER TABLE `Suggest_like` ADD CONSTRAINT `PK_SUGGEST_LIKE` PRIMARY KEY (
	`suggest_like_index`,
	`sug_index`,
	`user_index`,
	`user_index2`
);

ALTER TABLE `Restaurant` ADD CONSTRAINT `FK_Category_TO_Restaurant_1` FOREIGN KEY (
	`category_index`
)
REFERENCES `Category` (
	`category_index`
);

ALTER TABLE `Review` ADD CONSTRAINT `FK_User_TO_Review_1` FOREIGN KEY (
	`user_index`
)
REFERENCES `User` (
	`user_index`
);

ALTER TABLE `Review` ADD CONSTRAINT `FK_Restaurant_TO_Review_1` FOREIGN KEY (
	`rest_index`
)
REFERENCES `Restaurant` (
	`rest_index`
);

ALTER TABLE `Review` ADD CONSTRAINT `FK_Restaurant_TO_Review_2` FOREIGN KEY (
	`category_index`
)
REFERENCES `Restaurant` (
	`category_index`
);

ALTER TABLE `Suggestions` ADD CONSTRAINT `FK_User_TO_Suggestions_1` FOREIGN KEY (
	`user_index`
)
REFERENCES `User` (
	`user_index`
);

ALTER TABLE `LikeList` ADD CONSTRAINT `FK_User_TO_LikeList_1` FOREIGN KEY (
	`user_index`
)
REFERENCES `User` (
	`user_index`
);

ALTER TABLE `LikeList` ADD CONSTRAINT `FK_Restaurant_TO_LikeList_1` FOREIGN KEY (
	`rest_index`
)
REFERENCES `Restaurant` (
	`rest_index`
);

ALTER TABLE `LikeList` ADD CONSTRAINT `FK_Restaurant_TO_LikeList_2` FOREIGN KEY (
	`category_index`
)
REFERENCES `Restaurant` (
	`category_index`
);

ALTER TABLE `Email_Confirm` ADD CONSTRAINT `FK_User_TO_Email_Confirm_1` FOREIGN KEY (
	`user_index`
)
REFERENCES `User` (
	`user_index`
);

ALTER TABLE `Menu` ADD CONSTRAINT `FK_Restaurant_TO_Menu_1` FOREIGN KEY (
	`rest_index`
)
REFERENCES `Restaurant` (
	`rest_index`
);

ALTER TABLE `Menu` ADD CONSTRAINT `FK_Restaurant_TO_Menu_2` FOREIGN KEY (
	`category_index`
)
REFERENCES `Restaurant` (
	`category_index`
);

ALTER TABLE `Suggest_like` ADD CONSTRAINT `FK_Suggestions_TO_Suggest_like_1` FOREIGN KEY (
	`sug_index`
)
REFERENCES `Suggestions` (
	`sug_index`
);

ALTER TABLE `Suggest_like` ADD CONSTRAINT `FK_Suggestions_TO_Suggest_like_2` FOREIGN KEY (
	`user_index2`
)
REFERENCES `Suggestions` (
	`user_index`
);

ALTER TABLE `Suggest_like` ADD CONSTRAINT `FK_User_TO_Suggest_like_1` FOREIGN KEY (
	`user_index`
)
REFERENCES `User` (
	`user_index`
);

desc user

INSERT INTO USER VALUES(null,'admin', '1234', '어드민', 'admin@test.com', '010-0000-0000');


