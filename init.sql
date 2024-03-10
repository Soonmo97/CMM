
-- Active: 1707101285852@@127.0.0.1@3306@cmm
create database cmm DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;use cmm;

CREATE USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
SELECT host, user from mysql.user;

show DATABASES;

show tables;


use cmm

show tables

desc Category;
desc LikeList;
desc Menu;
desc Restaurant;
desc Review;
desc User

insert into restaurant values(null,'마쯔무라', '저희 마쯔무라 돈가스전문점 창동본점은 1997년 8월 15일 개업하여 오늘에 이르기까지 고객의 꾸준한 사랑을 받으며 나날이 성장해 왔습니다. 진심으로 감사드리며 앞으로도 수익보다는 고객 한 분 한 분들에게 만족을 느끼게 하는데 최선을 다할 것임을 약속합니다.
', '서울 도봉구 노해로63길 84 지하1층', '02-990-9801', '화~금 09:30 ~ 18:00, 토 09:30 ~ 18:00');

insert into restaurant VALUES(null, "리얼파스타", '안녕하세요 리얼파스타 창동점입니다 :)
전화포장, 배달의민족, 배민1, 요기요, 쿠팡이츠 모두 주문 가능합니다 :)
단체석, 아기의자 완비되어 있습니다 :)
시원한 하이볼, 와인, 맥주 준비되어 있습니다 :)', '서울 도봉구 마들로11길 71 신한빌딩 203호 리얼파스타창동점', '0507-1394-9311','매일
11:00 - 21:30
15:00 - 16:30 브레이크타임
20:50 라스트오더');

insert into restaurant VALUES(null, "코토코토","소개","주소","전화번호","영업시간"
)

DELETE FROM restaurant WHERE rest_name = '코토코토';





insert into restaurant VALUES(null, "감탄계","소개","주소","전화번호","영업시간"
)

insert into restaurant VALUES(null, "수유리 우동집","소개","주소","전화번호","영업시간"
)

insert into restaurant VALUES(null, "빽다방","소개","주소","전화번호","영업시간")

insert into restaurant VALUES(null, "샐러디","소개","주소","전화번호","영업시간")



insert into restaurant VALUES(null, "식당7", "리얼파스타는 맛있어요", "서울 도봉구 창동", "02-000-0000", "월~금 18:00");

insert into Category values(null, '일식', 1);
insert into Category VALUES(null, "양식", 2);

insert into user values(null, 'test', '1234', '테스트', 'test123@gmail.com')

insert into user values(null, 'test2', '1234', '테스트2', 'test2123@gmail.com')

insert into LikeList values(null, 1, 1);

insert into menu values(null, '로스(등심) 까스', 10500, 1);
insert into menu values(null, '히레(안심) 까스', 11000, 1);
insert into menu values(null, '치즈 까스', 12000, 1);

insert into review values(null, '창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...', 5, now(), 1, 1)

insert into review values(null, '2창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...', 3, now(), 1, 2)

insert into review values(null, '33창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...', 3, now(), 1, 2)

insert into review values(null, '444창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...', 3, now(), 1, 2)

insert into review values(null, '555창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...', 3, now(), 1, 2)

insert into review values(null, '666창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...', 3, now(), 1, 2)

insert into review values(null, '777창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...', 3, now(), 1, 2)

insert into restaurant VALUES(null, '홍콩반점', 5 , '소개글', '주소' , '전화번호','영업시간' );
insert into restaurant VALUES(null, '철수는 부대찌개 영희는 김치찌개', 5 , '소개글', '주소' , '전화번호','영업시간' );
insert into restaurant VALUES(null, '마쯔무라 돈까스', 5 , '소개글', '주소' , '전화번호','영업시간' );
insert into restaurant VALUES(null, '수유리 우동집', 5 , '소개글', '주소' , '전화번호','영업시간' );
insert into restaurant VALUES(null, '빽다방', 5 , '홍콩반점입니다~', '주소' , '전화번호','영업시간' );
insert into restaurant VALUES(null, '리얼파스타', 5 , '홍콩반점입니다~', '주소' , '전화번호','영업시간' );

insert into category VALUES(null, "한식",1);

insert into category VALUES(null, "일식",2);

insert into category VALUES(null, "양식",3);

insert into category VALUES(null, "중식",4);

insert into category VALUES(null, "디저트",5);

Select * from restaurant;

select * from category;

select * from user;

select * from menu;

select * from likelist;

select * from review

DELETE FROM User;

delete from review where review_index = 12;

drop DATABASE CMM;

drop TABLE user;