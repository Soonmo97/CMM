const { LikeList, Restaurant, Review, User } = require("../models");
const bcrypt = require("bcrypt");

// GET /mypage/likeList
// 내 좋아요 목록 조회
exports.getLikeList = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const likeList = await LikeList.findAll({
            where: {
                user_index: userIndex,
            },
            include: {
                model: Restaurant,
                attributes: ["rest_name"],
            },
            attributes: ["rest_index"],
        }).catch((err) => {
            console.log("내 좋아요 목록 조회 error", err);
        });
        res.render("./mypage/likeList", { likeList: likeList, user: user, isLogin: isLogin });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// delete /mypage/likeList/deleteLike
// 좋아요 삭제
exports.deleteLike = async (req, res) => {
    try {
        console.log(req.body);
        const { restIndex } = req.body;
        const userIndex = req.session.index;
        await LikeList.destroy({
            where: {
                rest_index: restIndex,
                user_index: userIndex,
            },
        }).catch((err) => {
            console.log("좋아요 삭제 error", err);
        });
        res.send({ message: "좋아요가 삭제되었습니다." });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// POST /mypage/likeList/createLike
// 좋아요 추가
exports.createLike = async (req, res) => {
    console.log(req.body);
    const { restIndex } = req.body;
    const userIndex = req.session.index;
    await LikeList.create({
        rest_index: restIndex,
        user_index: userIndex,
    }).catch((err) => {
        console.log("좋아요 등록 error", err);
    });
    res.send({ message: "좋아요 등록되었습니다." });
};

// GET /mypage/reviewList
// 내 리뷰 조회
exports.getReviewList = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const reviewList = await Review.findAll({
            where: {
                user_index: userIndex,
            },
            include: {
                model: Restaurant,
                attributes: ["rest_name"],
            },
            attributes: [
                "review_index",
                "rest_index",
                "review_rating",
                "review_content",
                "createdAt",
            ],
        }).catch((err) => {
            console.log("내 리뷰 조회 error", err);
        });
        res.render("./mypage/reviewList", { reviewList: reviewList, user: user, isLogin: isLogin });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// GET /mypage/reviewList/:reviewIndex
// 내 리뷰 상세 (조회, 수정, 삭제)
exports.getReviewDetail = async (req, res) => {
    try {
        const { reviewIndex } = req.params;
        console.log("reviewIndex > ", reviewIndex);
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const check = await Review.findOne({
            where: {
                review_index: reviewIndex,
            },
            attributes: ["user_index"],
        });
        if (check.user_index !== userIndex) {
            return res.send(
                "<script>alert('올바르지 못한 접근입니다.'); window.location.href = '/';</script>"
            );
        }
        const reviewDetail = await Review.findOne({
            where: {
                review_index: reviewIndex,
            },
            include: {
                model: Restaurant,
                attributes: ["rest_name"],
            },
            attributes: [
                "review_index",
                "rest_index",
                "review_rating",
                "review_content",
                "createdAt",
            ],
        }).catch((err) => {
            console.log("내 리뷰 상세 조회 error", err);
        });
        // console.log("reviewDetail data >>", reviewDetail);
        res.render("./mypage/reviewDetail", {
            reviewDetail: reviewDetail,
            user: user,
            isLogin: isLogin,
        });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// PATCH /mypage/reviewList/update
// 내 리뷰 수정(상세)
exports.updateReview = async (req, res) => {
    try {
        const { updateRating, updateContent, reviewIndex } = req.body;
        console.log("reviewIndex >>>> ", reviewIndex);
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        await Review.update(
            {
                review_rating: updateRating,
                review_content: updateContent,
            },
            {
                where: {
                    review_index: reviewIndex,
                },
            }
        )
            .then(() => {
                res.send();
            })
            .catch((err) => {
                res.send("서버에러", err);
            });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// DELETE /mypage/reviewList/:
// 내 리뷰 삭제
exports.deleteReview = async (req, res) => {
    try {
        const { reviewIndex } = req.body;
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        await Review.destroy({
            where: {
                review_index: reviewIndex,
            },
        })
            .then(() => {
                res.send();
            })
            .catch((err) => {
                console.log("내 리뷰 삭제 error", err);
            });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// GET /mypage/profile
// 내 정보 조회
exports.getProfile = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        const userinfo = await User.findOne({
            where: {
                user_index: userIndex,
            },
        }).catch((err) => {
            console.log("내 프로필 조회 error", err);
        });
        res.render("./mypage/profile", { userInfo: userinfo, user: user, isLogin: isLogin });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// PATCH /mypage/profile/updateNickname
// 닉네임 수정
exports.updateNickname = async (req, res) => {
    try {
        const { updateNickname } = req.body;
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        console.log("변경할 닉네임 >> ", updateNickname);
        console.log("변경할 유저 인덱스> > >", userIndex);
        await User.update(
            {
                nickname: updateNickname,
            },
            {
                where: {
                    user_index: userIndex,
                },
            }
        )
            .then(() => {
                res.send();
            })
            .catch((err) => {
                res.send("닉네임 변경 서버에러", err);
            });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// PATCH /mypage/profile/updatePw
// 비밀번호 변경
exports.updatePw = async (req, res) => {
    try {
        const { updatePw } = req.body;
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        console.log("변경할 pw >> ", updatePw);
        console.log("변경할 유저 인덱스> > >", userIndex);
        const encryptPw = await bcrypt.hash(updatePw, 10);
        console.log("암호화 된 pw >>", encryptPw);
        await User.update(
            {
                pw: encryptPw,
            },
            {
                where: {
                    user_index: userIndex,
                },
            }
        )
            .then(() => {
                res.send();
            })
            .catch((err) => {
                console.log("비밀번호 변경 서버 err", err);
                res.status(500).send("sever error");
            });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};

// DELETE /mypage/profile/deleteUser
// 회원탈퇴
exports.deleteUser = async (req, res) => {
    try {
        let isLogin = false;
        const user = req.session.user;
        if (user) isLogin = true;
        userIndex = req.session.index;
        await User.destroy({
            where: {
                user_index: userIndex,
            },
        })
            .then(() => {
                req.session.destroy((err) => {
                    if (err) {
                        res.status(500).send("회원탈퇴 중 오류 발생");
                    } else {
                        res.send();
                    }
                });
            })
            .catch((err) => {
                console.log("회원탈퇴 error", err);
            });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("sever error");
    }
};
