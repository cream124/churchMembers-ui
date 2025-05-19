import * as React from "react";
import { Avatar, Box, Grid, Stack } from "@mui/material";
import TypographyComp from "../Common/TypographyComp";
// import TypographyComp from "../../../common/TypographyComp";

const titleTextColor = '#213b2d';

export default function HeaderReportForm(props) {
  const { title, subTitle, subTitle2, date } = props;
  const logo = '/images/cemetery.png';
  const searchForm = () => {
    return (
      <>
        <Grid container spacing={2} alignItems="center" >
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Avatar
                src={logo}
                sx={{ width: 80, height: 80, margin: "auto" }}
              >
                A
              </Avatar>
              <TypographyComp
                variant="h6"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {`Campo Santo "Llauquequiri"`}
              </TypographyComp>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {date &&
                <>
                  <TypographyComp
                    variant="h8"
                    // fontWeight="bold"
                    textcolor={titleTextColor}
                  >
                    {`Fecha:`}
                  </TypographyComp>
                  <TypographyComp
                    variant="h8"
                    fontWeight="bold"
                    textcolor={titleTextColor}
                  >
                    {date}
                  </TypographyComp>
                </>
              }
            </Stack>
          </Grid>
          <Grid item xs={12}></Grid>
          {/* <Grid item xs={12}></Grid> */}
        </Grid>
        {title &&
          <Box style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Stack direction="column" justifyContent="center" spacing={1}>
              <TypographyComp
                variant="h6"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {title}
              </TypographyComp>
              <TypographyComp
                variant="h8"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {subTitle}
              </TypographyComp>
              <TypographyComp
                variant="h8"
                fontWeight="bold"
                textcolor={titleTextColor}
              >
                {subTitle2}
              </TypographyComp>
              <div> .</div>
            </Stack>
          </Box>
        }

      </>
    )
  }
  return (
    <>{searchForm()}</>
  )
}