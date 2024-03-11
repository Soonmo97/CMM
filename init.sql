-- Active: 1707101285852@@127.0.0.1@3306@cmm
create database cmm DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use cmm;

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

insert into restaurant values(1,'코토코토',null, '서울 도봉구 노해로69길 26','0507-1358-6008','월 ~ 금 - 11:00 ~ 21:00 (20:30 라스트오더), 토 - 11:00 ~ 20:00 (19:30 라스트오더), 일 - 정기휴무 (매주 일요일)) ');
insert into restaurant values(2,'철수는 부대찌개 영희는 김치찌개','김치찌개 부대찌개 돌솥비빔밥 불고기백반 6900원
혼밥환영 가성비갑
안주메뉴 추가
짬뽕맛해물탕,불고기야채쌈,매콤찜닭', '서울 도봉구 노해로65길 7-12 1층','0507-1339-1504','매일 11:00 ~ 22:30');
insert into restaurant values(3,'리얼파스타 창동점','안녕하세요 리얼파스타 창동점입니다 :)
전화포장, 배달의민족, 배민1, 요기요, 쿠팡이츠 모두 주문 가능합니다 :)
단체석, 아기의자 완비되어 있습니다 :)
시원한 하이볼, 와인, 맥주 준비되어 있습니다 :)', '서울 도봉구 마들로11길 71 신한빌딩 203호 리얼파스타창동점','0507-1394-9311','매일 11:00 ~ 21:30, 15:00 ~ 16:30 브레이크타임, 20:50 라스트오더');
insert into restaurant values(4,'마쯔무라돈가스 본점','저희 마쯔무라 돈가스전문점 창동본점은 1997년 8월 15일 개업하여 오늘에 이르기까지 고객의 꾸준한 사랑을 받으며 나날이 성장해 왔습니다. 진심으로 감사드리며 앞으로도 수익보다는 고객 한 분 한 분들에게 만족을 느끼게 하는데 최선을 다할 것임을 약속합니다.
', '서울 도봉구 노해로63길 84 지하1층','02-990-9801','화 ~ 금 - 09:30 ~ 18:00, 토 09:30 ~ 16:00, 일 ~ 월 정기휴무');
insert into restaurant values(5,'국수나무 창동점','- 생면 전문점으로써 한식, 중식, 일식의 대표 면요리를 제공합니다.
돈까스,덮밥,면류등 모두가 맛있게 즐길수 있는 다양한 메뉴가 있습니다.', '서울 도봉구 노해로63가길 22 1층 102호','02-907-2333','월 ~ 토 - 11:00 ~ 21:00, 일 - 정기휴무 (매주 일요일)');
insert into restaurant values(6,'빽다방 창동역점','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');
insert into restaurant values(null,'','', '','','');

insert into Category values(null, '일식', 1);
insert into Category VALUES(null, "한식", 2);
insert into Category VALUES(null, "양식", 3);
insert into Category VALUES(null, "일식", 4);
insert into Category VALUES(null, "한식", 5);

insert into Category VALUES(null, "일식", 5);

insert into Category VALUES(null, "디저트", 6);
insert into Category VALUES(null, "", );
insert into Category VALUES(null, "", );
insert into Category VALUES(null, "", );
insert into Category VALUES(null, "", );
insert into Category VALUES(null, "", );
insert into Category VALUES(null, "", );
insert into Category VALUES(null, "", );
insert into Category VALUES(null, "", );

insert into menu values(null, '돈코츠라멘', 10000, 1);
insert into menu values(null, '쇼유라멘', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '김치찌개', 6900, 2);
insert into menu values(null, '불고기백반', 6900, 2);
insert into menu values(null, '돌솥비빔밥', 6900, 2);
insert into menu values(null, '토마토 파스타', 7900, 3);
insert into menu values(null, '베이컨 새우 크림 파스타', 9500, 3);
insert into menu values(null, '차돌 필라프', 9500, 3);
insert into menu values(null, '로스(등심) 까스', 10500, 4);
insert into menu values(null, '히레(안심) 까스', 11000, 4);
insert into menu values(null, '치즈 까스', 12000, 4);
insert into menu values(null, '잔치국수', 5500, 5);
insert into menu values(null, '국치정식', 8900, 5);
insert into menu values(null, '새우튀김우동', 7500, 5);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);
insert into menu values(null, '가츠동', 10000, 1);

Select * from restaurant;

select * from category;

select * from user;

select * from menu;

select * from likelist;

select * from review

DELETE FROM User;

drop DATABASE CMM;

drop TABLE user;

delete from Restaurant

alter table `Restaurant` AUTO_INCREMENT = 1;

drop TABLE category;
