"use client";
import {Container} from "reactstrap";


function Version() {
  const REPO_URL = process.env.REPO_URL;
  const COMMIT_BRANCH = process.env.COMMIT_BRANCH;
  const COMMIT_HASH = process.env.COMMIT_HASH;
  return (
    <div id={"version-info"}>
      <a href={`${REPO_URL}/commit/${COMMIT_HASH}`}
         target={"_blank"}
         rel={"noreferrer"}
      >{COMMIT_HASH}</a>-{COMMIT_BRANCH}
    </div>
  );
}

export default function Footer() {
  return (
    <Container fluid>
      <footer className={"footer"}>
        <Version/>
      </footer>
    </Container>
  );
}