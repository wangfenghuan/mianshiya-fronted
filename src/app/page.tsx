import React from "react";
import Title from "antd/es/skeleton/Title";
import {Divider, Flex, message} from "antd";
import {listQuestionBankByPageUsingPost} from "@/api/questionBankController";
import Link from "next/link";
import {listQuestionByPageUsingPost} from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";

const HomePage: React.FC = async () => {

  let  questionBankList: API.QuestionBank[] | API.QuestionBankVO[] = [];
  let questionList = [];

  try {
    const res = await listQuestionBankByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc"
    });
    questionBankList = res.data.data?.records ?? [];
  }catch (e){
  }

  try {
    const res = await listQuestionByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc"
    });
    questionList = res.data.data?.records ?? [];
  }catch (e){

  }

  return (
      <div id="homePage">
        <Flex justify="space-between" align="center">
          <Title>最新题库</Title>
          <Link href={"/banks"}>查看更多</Link>
        </Flex>
          <QuestionBankList questionBankList={questionBankList}/>
        <Divider/>
        <Flex justify="space-between" align="center">
          <Title>最新题目</Title>
          <Link href={"/questions"}>查看更多</Link>
        </Flex>

        <div>题目列表</div>
      </div>
  )
}
export default HomePage;