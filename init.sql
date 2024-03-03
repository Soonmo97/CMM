create database cmm DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;use cmm;

show DATABASES

use cmm

show tables

desc Category;
desc LikeList;
desc Menu;
desc Restaurant;
desc Review;
desc User

insert into restaurant values(null,'마쯔무라',null, '저희 마쯔무라 돈가스전문점 창동본점은 1997년 8월 15일 개업하여 오늘에 이르기까지 고객의 꾸준한 사랑을 받으며 나날이 성장해 왔습니다. 진심으로 감사드리며 앞으로도 수익보다는 고객 한 분 한 분들에게 만족을 느끼게 하는데 최선을 다할 것임을 약속합니다.
', '서울 도봉구 노해로63길 84 지하1층', '02-990-9801', '화~금 09:30 ~ 18:00, 토 09:30 ~ 18:00');


insert into Category values(null, '일식', 1);

insert into user values(null, 'test', '1234', '테스트', 'test123@gmail.com')

insert into LikeList values(null, 1, 1);

insert into menu values(null, '로스(등심) 까스', 10500, 1);
insert into menu values(null, '히레(안심) 까스', 11000, 1);
insert into menu values(null, '치즈 까스', 12000, 1);

insert into review values(null, '창동역 근처 최고의 맛집입니다.
제가 먹어봤던 음식 중 제일 맛있네요. 가격도 싸고 가게도 깨끗해서 재방문 의사가 있습니다. 꼭 방문해보시길...',now(), 1, 1)


Select * from restaurant

select * from category

select * from user

select * from menu

select * from likelist

select * from review


