import React, { useState } from "react";
import { Chip, Grid, List, ListItemText, Typography } from "@mui/material";
import Pagination, { paginate } from "./pagination";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

function CarouselSmall(props) {
  const games = props.items;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const handlePageChangeForward = (page) => {
    setCurrentPage(currentPage + 1);
  };
  const handlePageChangeBackward = (page) => {
    setCurrentPage(currentPage - 1);
  };

  let paginated = paginate(games, currentPage, pageSize);

  return (
    <div>
      <Typography variant="h6" color="white" mt={10}>
        {props.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="end">
          <Pagination
            totalItems={games.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChangeForward={handlePageChangeForward}
            onPageChangeBackward={handlePageChangeBackward}
          ></Pagination>
        </Grid>

        {paginated.map((games) => (
          <Grid item xs={5} lg={2}>
            <div>
              <div>
                <Link to={`/games/${games.id}`} className="text-link">
                  <img
                    src={games.img1}
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                    }}
                    alt=""
                  />
                </Link>
                <Typography
                  sx={{ color: "white", mt: "5px", fontSize: "12px" }}
                >
                  {games.name}
                </Typography>
                <Grid container>
                  {games.discount ? (
                    <Grid item xs={12} lg={12} xl={3}>
                      <Chip
                        sx={{
                          bgcolor: "#0074E4",
                          color: "white",
                          mr: "10px",
                        }}
                        label={`-${games.discount}%`}
                      ></Chip>
                    </Grid>
                  ) : null}
                  {games.discount ? (
                    <Grid item mt={0.5} xs={12} lg={6} xl={3}>
                      <Typography
                        color="gray"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ${games.price.toFixed(2)}
                      </Typography>
                    </Grid>
                  ) : null}

                  {games.discount ? (
                    <Grid item mt={0.5} xs={12} lg={6} xl={3}>
                      <Typography color="white">
                        $
                        {(
                          games.price -
                          (games.discount * games.price) / 100
                        ).toFixed(2)}
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item mt={0.5} xs={12} lg={6} xl={3}>
                      <Typography color="white">${games.price}</Typography>
                    </Grid>
                  )}
                </Grid>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CarouselSmall;
