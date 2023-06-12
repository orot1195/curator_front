import * as C from './service.styles'
import Link from 'next/link'
import LayoutPageNumber from '../../../layout/page-number/page-number.presenter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

import ServiceContainer from './service.container'

export default function ServiceView(props) {

  const router = useRouter();
  const [serviceList, setServiceList] = useState();
  let serviceArray = []
  let firData = []

  // 작가명 get
  const ServiceList = async () => {
    const res = await axios.get('http://localhost:8080/root/helpAllList')
        let list;
        console.log(res.data)
        firData = res.data;
        for(let i = 0; i < res.data.length; i++) {
           const response = await axios.get(`http://localhost:8080/root/getName?seq=${res.data[i].memberSeq}`)
              list = { 
                helpSeq: res.data[i].helpSeq,
                helpTitle: res.data[i].helpTitle,
                helpName: response.data,
                helpContent: res.data[i].helpTitle,
                helpDate: getToday(res.data[i].helpDate),
              }
              serviceArray.push(list);
            }
            setServiceList(serviceArray);
  
        // .catch((error) => {
        //   console.log(error) 
        // })

  }

  useEffect(async () => {
    ServiceList();
  }, [])

  function getToday(day){
    var date = new Date(day);
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

console.log(serviceList)
console.log(serviceArray)



  return (
    
    <>  
      <C.Wrapper>
       <C.ServiceWrapper>
        <C.ServiceBanner>
          <C.ServiceTitle>고객센터</C.ServiceTitle>
          <C.ServiceSubTitle>
            <C.Link href="#">자주 묻는 질문</C.Link> &nbsp;
            <C.Link href="/board/service-board">1:1 문의하기</C.Link>
          </C.ServiceSubTitle>
        </C.ServiceBanner>

        {/* 구현예정..? */}
        <C.Select>
            <option disabled="true" selected="true">전체</option>
            <option>결제/구매</option>
            <option>판매/등록</option>
            <option>경매</option>
            <option>상품/배송</option>
            <option>기타</option>
        </C.Select>

          {/* Icon 클릭시 밑으로 상세 문의 내용 창이 주르륵 내려옴  */}
          {/* tabel,tr,td..사용으로 콘솔에 에러창 뜸 수정하기 */}
        <C.ServiceTable>
          <C.Table>
            <C.Tr>
              <C.Div>기타</C.Div><C.Title>무슨 웹사이트인가요?</C.Title><C.Icon><FontAwesomeIcon icon={faCaretDown} size="lg"/></C.Icon>
            </C.Tr>
            <C.Tr>
              <C.Div>결제/구매</C.Div><C.Title>작품 구매는 어떻게 하나요?</C.Title><C.Icon><FontAwesomeIcon icon={faCaretDown} size="lg"/></C.Icon>
            </C.Tr>
            <C.Tr>
              <C.Div>판매/등록</C.Div><C.Title>작품 판매는 어떻게 하나요?</C.Title><C.Icon><FontAwesomeIcon icon={faCaretDown} size="lg"/></C.Icon>
            </C.Tr>
            <C.Tr>
              <C.Div>판매/등록</C.Div><C.Title>작가, 작품 등록은 어떻게 하나요?</C.Title><C.Icon><FontAwesomeIcon icon={faCaretDown} size="lg"/></C.Icon>
            </C.Tr>
            <C.Tr>
              <C.Div>경매</C.Div><C.Title>경매는 어떻게 진행되나요?</C.Title><C.Icon><FontAwesomeIcon icon={faCaretDown} size="lg"/></C.Icon>
            </C.Tr>
            {serviceList?.map((el, i) => (
            <C.Tr>
              <C.Div>경매</C.Div><C.Title>{serviceList[i].helpTitle}</C.Title><C.Icon><FontAwesomeIcon icon={faCaretDown} size="lg"/></C.Icon>
            </C.Tr>
            ))}
          </C.Table>
        </C.ServiceTable>

        <LayoutPageNumber/>

       </C.ServiceWrapper>
      </C.Wrapper>
    </>
  )

}