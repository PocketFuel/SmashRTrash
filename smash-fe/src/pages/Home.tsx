import styled from "styled-components";
import Header from "../layouts/Header";
import WinnerCard from "../components/WinnerCard";
import { useContext, useEffect, useRef, useState } from "react";
import RankCard from "../components/RankCard";
import { BGColor, BorderColor, Yellow, SMTxt } from "../constants/Colors";
import { FileUploader } from "react-drag-drop-files";
import { Scrollbar } from "smooth-scrollbar-react";
import type { Scrollbar as BaseScrollbar } from "smooth-scrollbar/scrollbar";
import PlayerCard from "../components/PlayerCard";
import RoundUserCard from "../components/RoundUserCard";
import PlayCard from "../components/PlayCard";
import ScoreCard from "../components/ScoreCard";
import Footer from "../layouts/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { SocketContext } from "../contexts/SocketProvider";

import { useWallet } from "@solana/wallet-adapter-react";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

// import axios from 'axios';

const Main = styled.div`
  background-color: 100%;
`;
const Main_Container = styled.div`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: auto;
`;

const Logo = styled.img`
  max-width: 665px;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const WinnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 0 40px;
  max-width: 1000px;
  width: 100%;
  @media (max-width: 750px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 400px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0;
  }
`;

const Leaderboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 800px;
  margin-top: 50px;
  @media (max-width: 900px) {
    width: 600px;
  }
  @media (max-width: 700px) {
    width: 400px;
  }
  @media (max-width: 400px) {
    width: 300px;
  }
  @media (max-width: 350px) {
    width: 250px;
  }
`;
const LeaderBoardTitle = styled.div`
  font-size: 40px;
  @media (max-width: 900px) {
    font-size: 25px;
  }
  @media (max-width: 400px) {
    font-size: 20px;
    text-align: center;
  }
`;
const UserRanks = styled.div`
  width: 100%;
  display: flex;
  max-height: 400px;
  overflow-y: auto;
`;
const AddPlayerDiv = styled.form`
  width: 800px;
  padding: 20px;
  background-color: ${BGColor};
  border: 1px solid ${BorderColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
  @media (max-width: 900px) {
    width: 600px;
  }
  @media (max-width: 700px) {
    width: 400px;
  }
  @media (max-width: 400px) {
    width: 300px;
  }
  @media (max-width: 350px) {
    width: 250px;
  }
`;
const AddUserTxt = styled.div`
  font-size: 18px;
`;
const UserInput = styled.input`
  border-radius: 8px;
  background-color: #0d0d0d;
  width: 100%;
  border: 0.5px solid ${BorderColor};
  padding: 10px 5px;
  color: white;
`;
const TokenAmountInput = styled(UserInput)`
  border-radius: 8px;
  background-color: #0d0d0d;
  width: 100%;
  border: 0.5px solid ${BorderColor};
  padding: 10px 5px;
`;
const FileUploadDiv = styled.div`
  border: 2px dotted ${Yellow};
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
`;
const AddPlayerBtn = styled.button`
  border-radius: 15px;
  width: 100%;
  color: black;
  background-color: ${Yellow};
  border: 2px solid #eed343;
  padding: 15px 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #eed343;
    border-color: ${Yellow};
  }
  @media (max-width: 350px) {
    font-size: 14px;
    padding: 10px 0;
  }
`;
const CompetitorDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
  padding: 0 50px;
  @media (max-width: 370px) {
    padding: 0 10px;
  }
`;
const Competitors = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 10px;
  @media (max-width: 950px) {
    grid-template-columns: auto auto auto auto;
  }
  @media (max-width: 675px) {
    grid-template-columns: auto auto auto;
  }
  @media (max-width: 475px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 250px) {
    grid-template-columns: auto;
  }
`;
const BracketDiv = styled.div`
  text-align: center;
  font-weight: bold;
  @media (max-width: 500px) {
    padding: 0 10px;
    font-size: 14px;
    font-weight: normal;
  }
`;
const BracketTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
  padding: 20px 0;
  @media (max-width: 900px) {
    font-size: 40px;
  }
`;
const WarningTxt = styled.div`
  font-size: 14px;
  color: ${Yellow};
  font-weight: bold;
  padding: 20px 0 0 0;
`;
const VoteTxt = styled.div`
  font-size: 14px;
  color: ${SMTxt};
  padding: 10px 0;
`;
const Participants = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 15px 0;
`;
const ParticiCount = styled.div`
  font-size: 14px;
  padding: 5px 0;
`;
const RuleTxt = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 20px 0 10px 0;
`;
const RulesDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;
const RulesChild = styled.div`
  font-size: 16px;
  color: ${SMTxt};
  max-width: 500px;
`;
const RoundContainer = styled.div`
  width: 1200px;
  margin-top: 50px;
  margin-top: 50px;
  @media (max-width: 1300px) {
    width: 900px;
  }
  @media (max-width: 951px) {
    width: 100%;
    overflow-x: auto;
  }
`;
const RoundDiv = styled.div`
  display: flex;
  @media (max-width: 950px) {
    width: 700px;
    padding: 0 20px;
  }
`;
const RoundChild = styled.div<{currentRound: boolean}>`
  width: 25%;
  border-left: 0.5px solid ${props => props.currentRound?Yellow:BorderColor};
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 25px;
  @media (max-width: 1300px) {
    padding: 0 15px;
  }
`;
const RoundChild1 = styled.div<{currentRound: boolean}>`
  width: 25%;
  border-left: 0.5px solid ${props => props.currentRound?Yellow:'transparent'};
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 25px;
  @media (max-width: 1300px) {
    padding: 0 15px;
  }
`;
const RoundTitle = styled.div`
  font-size: 18px;
  color: ${Yellow};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RoundSmallDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
  height: 100%;
`;

const RoundCard = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-left: 4px solid ${BorderColor};
  border-bottom: 1px solid ${BorderColor};
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
    background-color: rgba(44, 41, 41, 0.5);
  }
  background-color: ${(props) =>
    props.selected ? "rgba(44, 41, 41, 0.5)" : ""};
`;
const GamePart = styled.div`
  max-width: 1000px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  padding: 0 20px;
`;
const HappeningNow = styled.div`
  color: black;
  background-color: ${Yellow};
  padding: 5px 20px;
  border-radius: 50px;
  text-transform: uppercase;
  font-weight: bold;
`;
const VoteBtn = styled(HappeningNow)`
  margin-top: 20px;
  &:hover {
    cursor: pointer;
    background-color: yellowgreen;
  }
`;
const Matchup = styled.div`
  font-size: 25px;
  color: ${Yellow};
  margin-top: 10px;
`;
const RoundTxt = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;
const ColorTxt = styled.span`
  color: ${Yellow};
`;
const TwoPlayer = styled.div`
  font-size: 35px;
`;
const MatchPot = styled.div`
  background-color: #131313;
  color: ${Yellow};
  border-radius: 15px;
  border: 2px solid ${BorderColor};
  padding: 5px 10px;
  width: auto;
  margin-top: 30px;
  font-size: 15px;
  font-weight: bold;
`;
const BattleDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;
const ScoreSelection = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 20px 0;
`;
const ScoresDiv = styled.div`
  width: 100%;
  display: grid;
  gap: 10px;
  /* padding: 0 50px; */
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 370px) {
    /* padding: 0 10px; */
  }
`;

const ImgRemoveBtn = styled.div`
  margin-top: 5px;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid transparent;
  &:hover {
    border: 1px dotted ${Yellow};
  }
`;

// File upload components
const UploadForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const FileImg = styled.img`
  width: 3rem;
  height: 3rem;
`;
const MiddleFile = styled.div`
  font-weight: bold;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;
const UploadFileTxt = styled.span`
  background-color: #0d0d0d;
  border: 1px solid ${BorderColor};
  color: ${Yellow};
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const HideTxt = styled.span`
  @media (max-width: 350px) {
    display: none;
  }
`;

const CountDown = styled.div`
    position: fixed;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    text-align: center;
    z-index: 100;
`

const ScoreCardList = [
  {
    role: "Shrimp",
    score: 1,
  },
  {
    role: "Lobster",
    score: 2,
  },
  {
    role: "Fish",
    score: 5,
  },
  {
    role: "Big Fish",
    score: 10,
  },
  {
    role: "Barracuda",
    score: 20,
  },
  {
    role: "Dolphin",
    score: 50,
  },
  {
    role: "Shark",
    score: 100,
  },
  {
    role: "Whale",
    score: 250,
  },
];

const fileTypes = ["JPEG", "PNG", "GIF"];

const FileElement = () => {
  return (
    <UploadForm>
      <FileImg src="/images/icons/file.png" />
      <MiddleFile>
        <UploadFileTxt>Upload a file </UploadFileTxt>
        <HideTxt>or drag and drop</HideTxt>
      </MiddleFile>
      <MiddleFile>PNG, JPG, GIF up to 10MB</MiddleFile>
    </UploadForm>
  );
};

interface User {
  _id?: string;
  username: string;
  avatar: string;
  walletAddress: string;
  vote: number;
  totalVote: number;
}

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 2) {
    return <div className="timer" style={{fontSize: '20px'}}>Lets start!</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value" style={{fontSize: '20px'}}>{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const Home = () => {
  const scrollbar = useRef<BaseScrollbar | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [round2users, setRound2users] = useState<User[]>([]);
  const [round3users, setRound3users] = useState<User[]>([]);
  const [winner, setWinner] = useState<User>();

  const [sortedUser, setSortedUser] = useState<User[]>([]);

  const [username, setUserName] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  const wallet = useWallet();
  const [walletAddress, setWalletAddress] = useState("");
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState("");

  //@ts-ignore
  const { socket } = useContext(SocketContext);

  const [battleUsers, setBattleUsers] = useState<User[]>([]);
  const [selectedPair, setPair] = useState<number>(1);
  const [battlerUser, setBattleUser] = useState<number>(1);

  const [vote, setVote] = useState<number>(1);
  const [timing, setTime] = useState(180);
  const [timing2, setTime2] = useState(120);
  const [timing3, setTime3] = useState(60);
  const [round, setRound] = useState(0);

  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    socket.off("newuser");
    socket.on("newuser", (data: { user: { username: string } }) => {
      toast.success(data.user.username + " joined!");
    });
  }, []);

  useEffect(() => {
    if (users) {
      console.log('users ===> ', users)
    }
  }, [users])

  useEffect(() => {
    socket.on("connected", (data: any) => {
      setUsers(data.users);

      let userNum = 0;
      for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].username == "") {
          break;
        }
        userNum += 1;
      }
      setUserCount(userNum);

      const totalUsers = [];
      for (let i = 0; i < data.users.length; i++) {
        totalUsers.push(data.users[i]);
      }

      const sotred = totalUsers.sort((user1: User, user2: User) => {
        return Number(user2.totalVote) - Number(user1.totalVote)
      })
      setSortedUser(sotred)

      if (data.round1 && data.round1.length != 0) {
        setRound2users(data.round1);
      }
      if (data.round2 && data.round2.length != 0) {
        setRound3users(data.round2);
      }
      if (data.winner) {
        setWinner(data.winner);
      }
      setRound(data.round);
      setTime(data.roundTime);
      setTime2(data.round2Time);
      setTime3(data.round3Time);
      selectBattleUser(users[0], users[1], 1);
    });
  });

  useEffect(() => {
    socket.off("new_voters");
    socket.off("new2_voters");
    socket.off("new3_voters");
    socket.on("new_voters", (data: any) => {
      toast.success(data.voter + " gave " + data.vote + "votes to " + data.gamer + "!");
      setUsers(data.users);
    });
    socket.on("new2_voters", (data: any) => {
      toast.success(data.voter + " gave " + data.vote + "votes to " + data.gamer + "!");
      setRound2users(data.users);
    });
    socket.on("new3_voters", (data: any) => {
      toast.success(data.voter + " gave " + data.vote + "votes to " + data.gamer + "!");
      setRound3users(data.users);
    });
  });

  useEffect(() => {
    if (users.length != 0) {
      const totalUsers = [];

      for (let i = 0; i < users.length; i++) {
        totalUsers.push(users[i])
      }

      const sotred: User[] = totalUsers.sort((user1: User, user2: User) => {
        return Number(user2.totalVote) - Number(user1.totalVote)
      })
      setSortedUser(sotred)
    }
    if (round == 0) {
      setBattleUsers([
        users[selectedPair * 2 - 2],
        users[selectedPair * 2 - 1],
      ]);
      const totalUsers = [];
      for (let i = 0; i < users.length; i++) {
        totalUsers.push(users[i]);
      }
      const sotred = totalUsers.sort((user1: User, user2: User) => {
        return Number(user2.totalVote) - Number(user1.totalVote)
      })
      setSortedUser(sotred)
    } else if (round == 1) {
      setBattleUsers([
        round2users[selectedPair * 2 - 2],
        round2users[selectedPair * 2 - 1],
      ]);
      const totalUsers = [];
      for (let i = 0; i < round2users.length; i++) {
        totalUsers.push(round2users[i]);
      }
      const sotred = totalUsers.sort((user1: User, user2: User) => {
        return Number(user2.totalVote) - Number(user1.totalVote)
      })

      setSortedUser(sotred)
    } else if (round == 2) {
      setBattleUsers(round3users);
      const totalUsers = [];
      for (let i = 0; i < round3users.length; i++) {
        totalUsers.push(round3users[i]);
      }
      const sotred = totalUsers.sort((user1: User, user2: User) => {
        return Number(user2.totalVote) - Number(user1.totalVote)
      })

      setSortedUser(sotred)
    }
  }, [users, round2users, round3users]);

  useEffect(() => {
    socket.off("timing");
    socket.off("round2time");
    socket.off("round3time");
    socket.off("nextround1");
    socket.off("nextround2");
    socket.off("nextround3");

    socket.on("timing", (data: any) => {
      setTime(data.timing);
    });
    socket.on("round2time", (data: any) => {
      setTime2(data.timing);
    });
    socket.on("round3time", (data: any) => {
      setTime3(data.timing);
    });

    socket.on("nextround1", (data: any) => {
      setRound2users(data.round2Users);
      setRound(1);
      setBattleUsers([]);
    });
    socket.on("nextround2", (data: any) => {
      setRound3users(data.round3Users);
      setRound(2);
      setBattleUsers([]);
    });
    socket.on("nextround3", (data: any) => {
      setWinner(data.winner);
      setRound(3);
      setBattleUsers([]);
    });
  });

  useEffect(() => {
    if (wallet && wallet.publicKey) {
      setWalletAddress(wallet.publicKey.toString());
    }
  }, [wallet, wallet.publicKey]);

  const usernameChange = (e: any) => {
    setUserName(e.target.value);
  };

  const tokenChange = (e: any) => {
    setTokenAmount(e.target.value);
  };

  const avatarChange = (files: any) => {
    const avatarFile = files[0];
    setAvatar(URL.createObjectURL(avatarFile));
    setFile(files[0]);
  };

  const addUser = async (e: any) => {
    e.preventDefault();

    if (username == "" || tokenAmount == 0 || !file) {
      toast.error("Please fill all fields!");
    } else if (walletAddress == "") {
      toast.error("Please connect your wallet for submit!");
    } else {
      const formDataToSend = new FormData();
      formDataToSend.append("username", username);
      formDataToSend.append("tokenAmount", tokenAmount.toString());
      formDataToSend.append("walletAddress", walletAddress);
      formDataToSend.append("avatar", file);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/users/addUser`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        socket.off("existuser");
        socket.off("allusers");
        socket.off("userfull");

        if (response && response.data) {
          console.log("join user ==> ", response.data)
          socket.emit("join_room", {
            username: username,
            avatar: response.data.user.avatar,
            walletAddress: walletAddress,
            vote: tokenAmount,
          });

          socket.on("allusers", () => {
            toast.success("Successfully Joined!");
            setTimeout(() => {
              location.href = '/'
            }, 1500);
          });
          socket.on("existuser", (data: { exist: boolean }) => {
            if (data.exist) {
              toast.error("You already joined with this wallet!");
            }
          });
          socket.on("userfull", (data: { userfull: boolean }) => {
            if (data.userfull) {
              toast.error("You cant join anymore, room is full!");
            }
          });
          socket.on("timingForMe", (data: { timing: number }) => {
            setTime(data.timing);
            window.location.href = "/";
          });
        } else {
          toast.error("There was an issue through the register!");
        }
      } catch (err: any) {
        toast.error(err.response.data.err);
      }
    }
  };

  const voteUser = async () => {
    if (timing == 180) {
      toast.error("You can't vote before the game starts!")
    } else {
      if (battleUsers[battlerUser - 1].username == "") {
        toast.error(
          "You can't vote for empty user. Please try after user joined!"
        );
      } else {
        if (walletAddress == "") {
          toast.error("Please connect a wallet!");
        } else {
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/users/vote`,
              {
                activity_type: "voter",
                gamer: battleUsers[battlerUser - 1].walletAddress,
                round: round,
                voter: walletAddress,
                vote: vote,
                gamer_name: battleUsers[battlerUser - 1].username
              }
            );
            const newvote = response.data.newVote;
            socket.off("new_voter");
            socket.off("new1_voter");
            socket.off("new2_voter");
            if (response.data) {
              toast.success("Successfully voted!");
              socket.emit("new_vote", {
                gamer: newvote.gamer,
                vote: newvote.vote,
                voter: newvote.voter,
                voter_num: battlerUser,
              });
              socket.on("new_voter", (data: any) => {
                setUsers(data.users);
              });
              socket.on("new1_voter", (data: any) => {
                setRound2users(data.users);
              });
              socket.on("new2_voter", (data: any) => {
                setRound3users(data.users);
              });
            }
          } catch (error: any) {
            console.log("Vote error ===> ", error);
            toast.error(error.response.data.err);
          }
        }
      }
    }
  };

  const selectBattleUser = (
    user1: User,
    user2: User,
    pairNum: number,
    user3?: User
  ) => {
    if (user3) {
      setBattleUsers([user1, user2, user3]);
    } else {
      setBattleUsers([user1, user2]);
    }
    setPair(pairNum);
  };

  return (
    <Main>
      {
        timing > 180 && timing < 190 && (
          <CountDown>
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </CountDown>
        )
      }
      <Header />
      <Main_Container>
        <Logo src="/images/site_logo.svg" />
        <WinnerDiv>
          {sortedUser.map((person, i) => {
            if (i > 2) {
              return false;
            } else {
              return (
                <WinnerCard
                  avatar={person.avatar}
                  username={person.username}
                  rank={i + 1}
                  key={i}
                />
              );
            }
          })}
        </WinnerDiv>

        <Leaderboard>
          <LeaderBoardTitle>Leaderboard</LeaderBoardTitle>
          <UserRanks>
            <Scrollbar ref={scrollbar}>
              {sortedUser.map((person, i) => {
                return (
                  <RankCard
                    avatar={person.avatar}
                    username={person.username}
                    rank={i + 1}
                    key={i}
                    vote={person.totalVote}
                  />
                );
              })}
            </Scrollbar>
          </UserRanks>
        </Leaderboard>
        <AddPlayerDiv onSubmit={addUser}>
          <AddUserTxt>Display Name</AddUserTxt>
          <UserInput
            placeholder="Competitor Name"
            onInput={usernameChange}
            value={username}
          />
          <AddUserTxt>Desired Deposit Amount</AddUserTxt>
          <TokenAmountInput
            placeholder="$RAIN Amount"
            type="number"
            onInput={tokenChange}
            value={tokenAmount}
            min={0}
          />
          <AddUserTxt>Upload your submission</AddUserTxt>
          <FileUploadDiv>
            {file ? (
              <img src={avatar} width={100} height={100} />
            ) : (
              <FileUploader
                multiple={true}
                handleChange={avatarChange}
                name="file"
                types={fileTypes}
                children={<FileElement />}
              />
            )}
            {file ? (
              <ImgRemoveBtn
                onClick={() => {
                  setFile(null);
                }}
              >
                Remove
              </ImgRemoveBtn>
            ) : (
              ""
            )}
          </FileUploadDiv>
          <AddPlayerBtn type="submit">Add Player</AddPlayerBtn>
        </AddPlayerDiv>
        <CompetitorDiv>
          <LeaderBoardTitle>Competitors</LeaderBoardTitle>
          <Competitors>
            {users &&
              users.map((person, i) => {
                return (
                  <PlayerCard
                    avatar={person.avatar}
                    username={person.username}
                    key={i}
                  />
                );
              })}
          </Competitors>
        </CompetitorDiv>
        <BracketDiv>
          <BracketTitle>Bracket</BracketTitle>
          <LeaderBoardTitle>Make it $RAIN on Champions</LeaderBoardTitle>
          <WarningTxt>Select a Champion for battle, and ready up!</WarningTxt>
          <VoteTxt>Vote on other maches while you wait.</VoteTxt>
          <Participants>Participants:</Participants>
          <ParticiCount>
            {
              <>{userCount}/12</>
            }
          </ParticiCount>
          <RuleTxt>Rules:</RuleTxt>
          <RulesDiv>
            <RulesChild>1 v 1. Single Elimination Tournament.</RulesChild>
            <RulesChild>
              1st, 2nd, & 3rd Place take 30%, 15%, and 5% of the pot each.
            </RulesChild>
            <RulesChild>Top 100 Voters share 20% of the pot.</RulesChild>
            <RulesChild>10% of the pot buys $RAIN at spot for burn.</RulesChild>
            <RulesChild>
              Numbers are always subject to change. We'd like the winners to
              feel they actually won something and our community has demanded
              that a portion of every pot go toward token burns.
            </RulesChild>
          </RulesDiv>
        </BracketDiv>
        <RoundContainer>
          <RoundDiv>
            <RoundChild1 currentRound={round == 1}>
              <RoundTitle>
                <span>Round 1</span> <span>{timing < 181?timing:180}s</span>
              </RoundTitle>
              {users.length != 0 && (
                <RoundSmallDiv>
                  <RoundCard
                    onClick={() => {
                      if (round == 0) selectBattleUser(users[0], users[1], 1);
                    }}
                    selected={round == 0 && selectedPair == 1 ? true : false}
                  >
                    <RoundUserCard
                      username={users[0].username}
                      avatar={users[0].avatar}
                      vote={users[0].totalVote}
                    />
                    <RoundUserCard
                      username={users[1].username}
                      avatar={users[1].avatar}
                      vote={users[1].totalVote}
                    />
                  </RoundCard>
                  <RoundCard
                    onClick={() => {
                      if (round == 0) selectBattleUser(users[2], users[3], 2);
                    }}
                    selected={round == 0 && selectedPair == 2 ? true : false}
                  >
                    <RoundUserCard
                      username={users[2].username}
                      avatar={users[2].avatar}
                      vote={users[2].totalVote}
                    />
                    <RoundUserCard
                      username={users[3].username}
                      avatar={users[3].avatar}
                      vote={users[3].totalVote}
                    />
                  </RoundCard>
                  <RoundCard
                    onClick={() => {
                      if (round == 0) selectBattleUser(users[4], users[5], 3);
                    }}
                    selected={round == 0 && selectedPair == 3 ? true : false}
                  >
                    <RoundUserCard
                      username={users[4].username}
                      avatar={users[4].avatar}
                      vote={users[4].totalVote}
                    />
                    <RoundUserCard
                      username={users[5].username}
                      avatar={users[5].avatar}
                      vote={users[5].totalVote}
                    />
                  </RoundCard>
                  <RoundCard
                    onClick={() => {
                      if (round == 0) selectBattleUser(users[6], users[7], 4);
                    }}
                    selected={round == 0 && selectedPair == 4 ? true : false}
                  >
                    <RoundUserCard
                      username={users[6].username}
                      avatar={users[6].avatar}
                      vote={users[6].totalVote}
                    />
                    <RoundUserCard
                      username={users[7].username}
                      avatar={users[7].avatar}
                      vote={users[7].totalVote}
                    />
                  </RoundCard>
                  <RoundCard
                    onClick={() => {
                      if (round == 0) selectBattleUser(users[8], users[9], 5);
                    }}
                    selected={round == 0 && selectedPair == 5 ? true : false}
                  >
                    <RoundUserCard
                      username={users[8].username}
                      avatar={users[8].avatar}
                      vote={users[8].totalVote}
                    />
                    <RoundUserCard
                      username={users[9].username}
                      avatar={users[9].avatar}
                      vote={users[9].totalVote}
                    />
                  </RoundCard>
                  <RoundCard
                    onClick={() => {
                      if (round == 0) selectBattleUser(users[10], users[11], 6);
                    }}
                    selected={round == 0 && selectedPair == 6 ? true : false}
                  >
                    <RoundUserCard
                      username={users[10].username}
                      avatar={users[10].avatar}
                      vote={users[10].totalVote}
                    />
                    <RoundUserCard
                      username={users[11].username}
                      avatar={users[11].avatar}
                      vote={users[11].totalVote}
                    />
                  </RoundCard>
                </RoundSmallDiv>
              )}
            </RoundChild1>
            <RoundChild currentRound={round == 2}>
              <RoundTitle>
                <span>Round 2</span> <span>{timing2}s</span>
              </RoundTitle>
              {round2users.length != 0 && (
                <RoundSmallDiv>
                  <RoundCard
                    onClick={() => {
                      if (round == 1)
                        selectBattleUser(round2users[0], round2users[1], 1);
                    }}
                    selected={round == 1 && selectedPair == 1 ? true : false}
                  >
                    <RoundUserCard
                      username={round2users[0].username}
                      avatar={round2users[0].avatar}
                      vote={round2users[0].totalVote}
                    />
                    <RoundUserCard
                      username={round2users[1].username}
                      avatar={round2users[1].avatar}
                      vote={round2users[1].totalVote}
                    />
                  </RoundCard>

                  <RoundCard
                    onClick={() => {
                      if (round == 1)
                        selectBattleUser(round2users[2], round2users[3], 2);
                    }}
                    selected={round == 1 && selectedPair == 2 ? true : false}
                  >
                    <RoundUserCard
                      username={round2users[2].username}
                      avatar={round2users[2].avatar}
                      vote={round2users[2].totalVote}
                    />
                    <RoundUserCard
                      username={round2users[3].username}
                      avatar={round2users[3].avatar}
                      vote={round2users[3].totalVote}
                    />
                  </RoundCard>

                  <RoundCard
                    onClick={() => {
                      if (round == 1)
                        selectBattleUser(round2users[4], round2users[5], 3);
                    }}
                    selected={round == 1 && selectedPair == 3 ? true : false}
                  >
                    <RoundUserCard
                      username={round2users[4].username}
                      avatar={round2users[4].avatar}
                      vote={round2users[4].totalVote}
                    />
                    <RoundUserCard
                      username={round2users[5].username}
                      avatar={round2users[5].avatar}
                      vote={round2users[5].totalVote}
                    />
                  </RoundCard>
                </RoundSmallDiv>
              )}
            </RoundChild>
            <RoundChild currentRound={round == 3}>
              <RoundTitle>
                <span>Round 3</span> <span>{timing3}s</span>
              </RoundTitle>
              {round3users.length != 0 && Number(round) >= 2 && (
                <RoundSmallDiv>
                  <RoundCard
                    onClick={() => {
                      if (round == 2)
                        selectBattleUser(
                          round3users[0],
                          round3users[1],
                          1,
                          round3users[2]
                        );
                    }}
                    selected={round == 2 && selectedPair == 1 ? true : false}
                  >
                    <RoundUserCard
                      username={round3users[0].username}
                      avatar={round3users[0].avatar}
                      vote={round3users[0].totalVote}
                    />
                    <RoundUserCard
                      username={round3users[1].username}
                      avatar={round3users[1].avatar}
                      vote={round3users[1].totalVote}
                    />
                    <RoundUserCard
                      username={round3users[2].username}
                      avatar={round3users[2].avatar}
                      vote={round3users[2].totalVote}
                    />
                  </RoundCard>
                </RoundSmallDiv>
              )}
            </RoundChild>
            <RoundChild style={{ borderRight: "1px solid #131313" }} currentRound={round == 4}>
              <RoundTitle>Finals</RoundTitle>
              {winner && Number(round) == 3 && (
                <RoundSmallDiv>
                  <RoundUserCard
                    username={winner.username}
                    avatar={winner.avatar}
                    vote={winner.totalVote}
                  />
                </RoundSmallDiv>
              )}
            </RoundChild>
          </RoundDiv>
        </RoundContainer>
        <GamePart>
          <HappeningNow>Happening now!</HappeningNow>
          <Matchup>Matchup:</Matchup>
          <RoundTxt>Round 1</RoundTxt>
          <TwoPlayer>
            Player 1 <ColorTxt>vs</ColorTxt> Player 2
          </TwoPlayer>
          <MatchPot>Match Pot: {"0"}</MatchPot>
          <BattleDiv>
            {/* {
              round == 1 && (
                <BattleDiv>
                  <PlayCard
                    avatar={users[selectedPair*2-2].avatar}
                    username={users[selectedPair*2-2].username}
                    selected={battlerUser == 1}
                    usernumber={selectedPair*2-2}
                    select={setBattleUser}
                    score={users[selectedPair*2-2].totalVote}
                  />
                  <PlayCard
                    avatar={users[selectedPair*2-1].avatar}
                    username={users[selectedPair*2-1].username}
                    selected={battlerUser == 2}
                    usernumber={selectedPair*2-1}
                    select={setBattleUser}
                    score={users[selectedPair*2-1].totalVote}
                  />
                </BattleDiv>
              )
            }
            {
              round == 2 && (
                <BattleDiv>
                  <PlayCard
                    avatar={round2users[selectedPair*2-2].avatar}
                    username={round2users[selectedPair*2-2].username}
                    selected={battlerUser == 1}
                    usernumber={selectedPair*2-2}
                    select={setBattleUser}
                    score={round2users[selectedPair*2-2].totalVote}
                  />
                  <PlayCard
                    avatar={round2users[selectedPair*2-1].avatar}
                    username={round2users[selectedPair*2-1].username}
                    selected={battlerUser == 2}
                    usernumber={selectedPair*2-1}
                    select={setBattleUser}
                    score={round2users[selectedPair*2-1].totalVote}
                  />
                </BattleDiv>
              )
            }
            {
              round == 3 && (
                <BattleDiv>
                  <PlayCard
                    avatar={round3users[0].avatar}
                    username={round3users[0].username}
                    selected={battlerUser == 1}
                    usernumber={1}
                    select={setBattleUser}
                    score={round3users[0].totalVote}
                  />
                  <PlayCard
                    avatar={round3users[1].avatar}
                    username={round3users[1].username}
                    selected={battlerUser == 2}
                    usernumber={1}
                    select={setBattleUser}
                    score={round3users[1].totalVote}
                  />
                  <PlayCard
                    avatar={round3users[2].avatar}
                    username={round3users[2].username}
                    selected={battlerUser == 3}
                    usernumber={2}
                    select={setBattleUser}
                    score={round3users[2].totalVote}
                  />
                </BattleDiv>
              )
            } */}
            {battleUsers && battleUsers[0] && (
              <PlayCard
                avatar={battleUsers[0].avatar}
                username={battleUsers[0].username}
                selected={battlerUser == 1}
                usernumber={1}
                select={setBattleUser}
                score={battleUsers[0].totalVote}
              />
            )}

            {battleUsers && battleUsers[1] && (
              <PlayCard
                avatar={battleUsers[1].avatar}
                username={battleUsers[1].username}
                selected={battlerUser == 2}
                usernumber={2}
                select={setBattleUser}
                score={battleUsers[1].totalVote}
              />
            )}
            {battleUsers && battleUsers[2] && (
              <PlayCard
                avatar={battleUsers[2].avatar}
                username={battleUsers[2].username}
                selected={battlerUser == 3}
                usernumber={3}
                select={setBattleUser}
                score={battleUsers[2].totalVote}
              />
            )}

            {/* <PlayCard avatar={UserList[1].avatar} username={UserList[1].username} /> */}
          </BattleDiv>
          <VoteBtn onClick={voteUser}>Vote: {vote}</VoteBtn>

          <ScoreSelection>Wanna increase your click size?</ScoreSelection>
          <ScoresDiv>
            {ScoreCardList.map((item, i) => {
              return (
                <ScoreCard
                  role={item.role}
                  score={item.score}
                  key={i}
                  seleted={item.score == vote}
                  setVote={setVote}
                />
              );
            })}
          </ScoresDiv>
        </GamePart>
        <Footer />
      </Main_Container>
    </Main>
  );
};

export default Home;
