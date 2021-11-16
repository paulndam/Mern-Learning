import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import auth from "../../auth/AuthHelper";
import { Enroll } from "../allComponents/AllComponents";
import { makeStyles } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  display: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  // backgroundColor: "red",
  marginTop: 25,
  width: "100%",

  //   width: "100%",
}));

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: "#eeeeee",
  padding: theme.spacing(1),
}));

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  container: {
    minWidth: "100%",
    paddingBottom: "14px",
  },
  gridList: {
    width: "100%",
    minHeight: 100,
    padding: "12px 0 10px",
  },
  tile: {
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "50%",
  },
  tileBar: {
    backgroundColor: "primary.main",
    textAlign: "left",
    width: "50%",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "#fffde7",
    display: "block",
  },
  action: {
    margin: "0 10px",
  },
  progress: {
    color: "#b4f8b4",
  },
}));

const AllCourses = (props) => {
  const classes = useStyles();

  const findCommonEnroll = (course) => {
    return !props.commonEnrollment.find((enrolled) => {
      return enrolled.course._id === course._id;
    });
  };
  return (
    <ImageList sx={{ width: "100%", height: 650 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">
          <Div
            sx={{
              backgroundColor: "#1b1b1b",
              height: 55,
              color: "whitesmoke",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            {"All Courses"}
          </Div>
        </ListSubheader>
      </ImageListItem>
      {props.courses.map((c, i) => {
        return (
          findCommonEnroll(c) && (
            <ImageListItem
              key={i}
              sx={{
                marginTop: 5,
                marginLeft: 25,
              }}
            >
              <Link underline="none" href={`/course/${c._id}`}>
                <img
                  className={classes.image}
                  src={`${process.env.REACT_APP_API}/api/courses/photo/${c._id}?w=248&fit=crop&auto=format`}
                  srcSet={`${process.env.REACT_APP_API}/api/courses/photo/${c._id}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={c.name}
                  loading="lazy"
                />
              </Link>
              <ImageListItemBar
                className={classes.tileBar}
                sx={{ backgroundColor: "primary.main" }}
                title={
                  <Link
                    underline="none"
                    href={`/course/${c._id}`}
                    sx={{ color: "white" }}
                  >
                    {c.name}
                  </Link>
                }
                subtitle={c.category}
                actionIcon={
                  <>
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${c.name}`}
                    >
                      <InfoIcon />
                    </IconButton>
                    <div>
                      {auth.isAuthenticated() ? (
                        <Enroll courseId={c._id} />
                      ) : (
                        <Link underline="none" href="/sigin">
                          SignIn to enroll
                        </Link>
                      )}
                    </div>
                  </>
                }
              />
            </ImageListItem>
          )
        );
      })}
    </ImageList>
  );
};

AllCourses.propTypes = {
  courseId: PropTypes.array.isRequired,
};

export default AllCourses;
