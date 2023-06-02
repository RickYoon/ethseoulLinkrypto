import {Link} from "react-router-dom"
import styled, { keyframes } from 'styled-components';
import bifrost from "../../assets/ci/BIFROST_Logo.svg"
import { BanknotesIcon, CalculatorIcon, ListBulletIcon, ServerIcon } from '@heroicons/react/20/solid'
import totalassets from "../../assets/uiux/totalAssets.png"
import product from "../../assets/uiux/product.svg"
import investInfo from "../../assets/uiux/investInfo.svg"
import assetperformance from "../../assets/uiux/assetperformance.svg"
import investdetail from "../../assets/uiux/investdetail.svg"
import kakaotalk from "../../assets/uiux/KakaoTalk.png"

import 'App.css'; 
import {
    Switch,
    Route,
    NavLink,
  } from 'react-router-dom';

function Landing() {

    const features = [
        {
          name: '투자가능한 자산현황 파악.',
          description:
            '현재 활용가능한 자산의 규모를 알려주고, 현재 디파이에 존재하는 풀의 실시간 정보를 기반으로 최대 수익율을 보여줍니다.',
          icon: BanknotesIcon,
        },
        {
          name: '자산활용 효율확인.',
          description: '시간에 따라 계속 변하게 되는 디파이 풀의 APR 정보를 기반으로 사용자의 투자 효율성을 체크해줍니다.',
          icon: CalculatorIcon,
        },
        {
          name: '투자상품 비교.',
          description: '같은 유동성 풀 투자라도 제공하는 유틸리티에 따라 ',
          icon: ListBulletIcon,
        },
      ]

  return (
    <>


<section className="pt-20 bg-gradient-to-r from-green-100 to-blue-200" >
<div style={{marginTop:"30px"}}></div>
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl text-black">Linkrypto</h1>
        <p className="mb-10 text-lg font-normal text-black lg:text-xl sm:px-16 xl:px-48">가장 쉽고 친절한 크립토 에셋 관리 서비스</p>
            <NavLink to="/manage" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                바로 시작하기
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </NavLink>
            <div style={{marginTop:"30px"}}></div>
            <p className="mb-2 pt-5 font-medium text-gray-500 md:text-lg dark:text-gray-400"> Connected </p>
            <dl class="grid grid-cols-3 gap-0 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
                <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">15개</dt>
                    <dd class="text-gray-500 dark:text-gray-400">프로토콜</dd>
                </div>
                <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">20개</dt>
                    <dd class="text-gray-500 dark:text-gray-400">투자풀</dd>
                </div>
                <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">1,248억</dt>
                    <dd class="text-gray-500 dark:text-gray-400">풀 TVL</dd>
                </div>
            </dl>
    </div>
</section>

<section className="bg-gray-000 pt-10 pb-10" style={{textAlign:"center", width:"100%"}}>
<div style={{height:"50px"}}/>

    <h2 className="mb-10 text-2xl text-black tracking-tight font-extrabold text-gray-900 dark:text-white">Linkrypto 란?</h2>
    <div style={{height:"20px"}}/>

    <p className="mb-2 font-medium text-gray-500 md:text-lg dark:text-gray-400"> 크립토 투자처 정보를 통합하여, 자산 맞춤형 투자관리 서비스를 제공합니다. </p>
    {/* <div style={{height:"200px"}}></div> */}
    <Svgcover style={{margin:"0px auto"}}>
    <svg width="639" height="123" viewBox="0 0 639 123" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="61.5" cy="61.5" r="61" fill="white" stroke="#004FC5"/>
        <circle cx="309.5" cy="61.5" r="61" fill="#004FC5" stroke="#004FC5"/>
        <circle cx="577.5" cy="61.5" r="61" fill="#E9E9E9" stroke="white"/>
        <path d="M53.0414 48.956H54.6494V60.104H53.0414V48.956ZM46.0934 56.12H47.0534C49.3934 56.12 50.7134 56.072 52.2014 55.796L52.3454 57.104C50.8454 57.404 49.4414 57.452 47.0534 57.452H46.0934V56.12ZM46.0934 49.94H51.4574V51.224H47.6774V56.624H46.0934V49.94ZM56.6045 49.976H62.7365V51.248H56.6045V49.976ZM56.4845 57.536L56.3165 56.228C58.2485 56.228 60.8645 56.204 63.0605 55.928L63.1445 57.092C60.9005 57.488 58.3805 57.536 56.4845 57.536ZM57.5525 50.972H59.1005V56.576H57.5525V50.972ZM60.2405 50.972H61.7885V56.576H60.2405V50.972ZM63.5645 48.956H65.1725V60.068H63.5645V48.956ZM64.8125 53.168H66.7805V54.476H64.8125V53.168ZM75.1195 48.944H76.7275V60.092H75.1195V48.944ZM70.7395 49.724C72.4195 49.724 73.6555 51.26 73.6555 53.684C73.6555 56.132 72.4195 57.668 70.7395 57.668C69.0595 57.668 67.8235 56.132 67.8235 53.684C67.8235 51.26 69.0595 49.724 70.7395 49.724ZM70.7395 51.176C69.9115 51.176 69.3475 52.052 69.3475 53.684C69.3475 55.34 69.9115 56.228 70.7395 56.228C71.5675 56.228 72.1195 55.34 72.1195 53.684C72.1195 52.052 71.5675 51.176 70.7395 51.176ZM39.9139 72.476H49.9699V73.784H39.9139V72.476ZM40.6819 64.916H49.1419V66.188H40.6819V64.916ZM40.7299 69.512H49.1059V70.796H40.7299V69.512ZM42.1939 66.092H43.7899V69.632H42.1939V66.092ZM46.0459 66.092H47.6299V69.632H46.0459V66.092ZM50.9529 72.548H61.0089V73.844H50.9529V72.548ZM55.1649 70.448H56.7609V73.076H55.1649V70.448ZM52.0809 64.676H59.8809V68.372H53.6889V70.244H52.1049V67.124H58.2969V65.936H52.0809V64.676ZM52.1049 69.608H60.1329V70.892H52.1049V69.608ZM63.168 69.452H70.98V70.712H63.168V69.452ZM61.992 72.56H72.048V73.844H61.992V72.56ZM66.216 70.088H67.812V73.124H66.216V70.088ZM63.168 64.712H70.884V65.984H64.788V69.932H63.168V64.712ZM64.296 67.064H70.632V68.312H64.296V67.064ZM74.1591 64.172H81.1911V65.384H74.1591V64.172ZM73.0431 68.516H83.0511V69.752H73.0431V68.516ZM76.7631 67.508H78.3591V69.104H76.7631V67.508ZM80.3511 64.172H81.9351V64.88C81.9351 65.66 81.9351 66.704 81.6951 68.072L80.1111 67.976C80.3511 66.62 80.3511 65.648 80.3511 64.88V64.172ZM80.8311 65.888V66.968L74.0391 67.256L73.8591 66.032L80.8311 65.888ZM74.1711 70.316H81.8511V73.172H75.7551V74.156H74.1831V72.08H80.2791V71.492H74.1711V70.316ZM74.1831 73.712H82.1391V74.9H74.1831V73.712Z" fill="#004FC5"/>
        <path d="M562.561 49.928H569.557V51.2H562.561V49.928ZM561.433 57.452H571.477V58.76H561.433V57.452ZM568.885 49.928H570.457V51.212C570.457 52.832 570.457 54.368 569.941 56.792L568.369 56.648C568.885 54.404 568.885 52.784 568.885 51.212V49.928ZM569.221 52.976V54.152L562.429 54.488L562.237 53.204L569.221 52.976ZM580.092 48.956H581.7V55.16H580.092V48.956ZM573.036 53.684H574.008C576.168 53.684 577.572 53.648 579.18 53.372L579.36 54.656C577.704 54.92 576.228 54.968 574.008 54.968H573.036V53.684ZM573.024 49.46H578.136V52.772H574.608V54.524H573.036V51.572H576.564V50.72H573.024V49.46ZM574.308 55.616H575.88V56.552H580.116V55.616H581.7V59.948H574.308V55.616ZM575.88 57.776V58.676H580.116V57.776H575.88ZM584.688 54.452H592.5V55.712H584.688V54.452ZM583.512 57.56H593.568V58.844H583.512V57.56ZM587.736 55.088H589.332V58.124H587.736V55.088ZM584.688 49.712H592.404V50.984H586.308V54.932H584.688V49.712ZM585.816 52.064H592.152V53.312H585.816V52.064ZM561.421 70.544H571.477V71.84H561.421V70.544ZM565.645 71H567.229V75.08H565.645V71ZM562.669 68.48H570.433V69.74H562.669V68.48ZM562.669 64.4H570.313V65.648H564.241V68.78H562.669V64.4ZM563.797 66.452H570.073V67.664H563.797V66.452ZM574.956 65.708H576.216V66.956C576.216 69.464 575.16 72.02 573.12 72.98L572.22 71.72C574.056 70.856 574.956 68.78 574.956 66.956V65.708ZM575.292 65.708H576.552V66.956C576.552 68.636 577.416 70.604 579.24 71.444L578.364 72.704C576.324 71.756 575.292 69.32 575.292 66.956V65.708ZM572.652 65.024H578.748V66.332H572.652V65.024ZM579.564 63.956H581.172V75.068H579.564V63.956ZM580.812 68.192H582.78V69.512H580.812V68.192ZM585.996 65.708H587.256V66.956C587.256 69.464 586.2 72.02 584.16 72.98L583.26 71.72C585.096 70.856 585.996 68.78 585.996 66.956V65.708ZM586.332 65.708H587.592V66.956C587.592 68.636 588.456 70.604 590.28 71.444L589.404 72.704C587.364 71.756 586.332 69.32 586.332 66.956V65.708ZM583.692 65.024H589.788V66.332H583.692V65.024ZM590.604 63.956H592.212V75.068H590.604V63.956ZM591.852 68.192H593.82V69.512H591.852V68.192Z" fill="#232323"/>
        <path d="M273.035 68V56.3636H275.495V65.9716H280.484V68H273.035ZM282.067 68V59.2727H284.488V68H282.067ZM283.283 58.1477C282.924 58.1477 282.615 58.0284 282.357 57.7898C282.103 57.5473 281.977 57.2576 281.977 56.9205C281.977 56.5871 282.103 56.3011 282.357 56.0625C282.615 55.8201 282.924 55.6989 283.283 55.6989C283.643 55.6989 283.95 55.8201 284.204 56.0625C284.461 56.3011 284.59 56.5871 284.59 56.9205C284.59 57.2576 284.461 57.5473 284.204 57.7898C283.95 58.0284 283.643 58.1477 283.283 58.1477ZM288.847 62.9545V68H286.427V59.2727H288.734V60.8125H288.836C289.029 60.3049 289.353 59.9034 289.808 59.608C290.262 59.3087 290.813 59.1591 291.461 59.1591C292.067 59.1591 292.595 59.2917 293.046 59.5568C293.497 59.822 293.847 60.2008 294.097 60.6932C294.347 61.1818 294.472 61.7652 294.472 62.4432V68H292.052V62.875C292.056 62.3409 291.919 61.9242 291.643 61.625C291.366 61.322 290.986 61.1705 290.501 61.1705C290.175 61.1705 289.887 61.2405 289.637 61.3807C289.391 61.5208 289.198 61.7254 289.058 61.9943C288.921 62.2595 288.851 62.5795 288.847 62.9545ZM298.573 65.4886L298.579 62.5852H298.931L301.727 59.2727H304.505L300.749 63.6591H300.175L298.573 65.4886ZM296.38 68V56.3636H298.8V68H296.38ZM301.835 68L299.266 64.1989L300.88 62.4886L304.67 68H301.835ZM305.692 68V59.2727H308.039V60.7955H308.13C308.289 60.2538 308.556 59.8447 308.931 59.5682C309.306 59.2879 309.738 59.1477 310.227 59.1477C310.348 59.1477 310.478 59.1553 310.619 59.1705C310.759 59.1856 310.882 59.2064 310.988 59.233V61.3807C310.874 61.3466 310.717 61.3163 310.516 61.2898C310.316 61.2633 310.132 61.25 309.965 61.25C309.609 61.25 309.291 61.3277 309.011 61.483C308.734 61.6345 308.514 61.8466 308.352 62.1193C308.192 62.392 308.113 62.7064 308.113 63.0625V68H305.692ZM313.999 71.2727C313.692 71.2727 313.405 71.2481 313.136 71.1989C312.871 71.1534 312.651 71.0947 312.477 71.0227L313.022 69.2159C313.306 69.303 313.562 69.3504 313.789 69.358C314.02 69.3655 314.219 69.3125 314.386 69.1989C314.556 69.0852 314.694 68.892 314.8 68.6193L314.942 68.25L311.812 59.2727H314.357L316.164 65.6818H316.255L318.079 59.2727H320.641L317.249 68.9432C317.086 69.4129 316.865 69.822 316.585 70.1705C316.308 70.5227 315.958 70.7936 315.533 70.983C315.109 71.1761 314.598 71.2727 313.999 71.2727ZM321.88 71.2727V59.2727H324.266V60.7386H324.374C324.48 60.5038 324.634 60.2652 324.835 60.0227C325.039 59.7765 325.304 59.572 325.63 59.4091C325.96 59.2424 326.369 59.1591 326.857 59.1591C327.494 59.1591 328.081 59.3258 328.619 59.6591C329.156 59.9886 329.586 60.4867 329.908 61.1534C330.23 61.8163 330.391 62.6477 330.391 63.6477C330.391 64.6212 330.234 65.4432 329.92 66.1136C329.609 66.7803 329.185 67.286 328.647 67.6307C328.113 67.9716 327.514 68.142 326.852 68.142C326.382 68.142 325.982 68.0644 325.653 67.9091C325.327 67.7538 325.06 67.5587 324.852 67.3239C324.643 67.0852 324.484 66.8447 324.374 66.6023H324.3V71.2727H321.88ZM324.249 63.6364C324.249 64.1553 324.321 64.608 324.465 64.9943C324.609 65.3807 324.817 65.6818 325.09 65.8977C325.363 66.1098 325.694 66.2159 326.085 66.2159C326.478 66.2159 326.812 66.108 327.085 65.892C327.357 65.6723 327.564 65.3693 327.704 64.983C327.848 64.5928 327.92 64.1439 327.92 63.6364C327.92 63.1326 327.85 62.6894 327.71 62.3068C327.569 61.9242 327.363 61.625 327.09 61.4091C326.817 61.1932 326.482 61.0852 326.085 61.0852C325.691 61.0852 325.357 61.1894 325.085 61.3977C324.816 61.6061 324.609 61.9015 324.465 62.2841C324.321 62.6667 324.249 63.1174 324.249 63.6364ZM336.647 59.2727V61.0909H331.391V59.2727H336.647ZM332.585 57.1818H335.005V65.3182C335.005 65.5417 335.039 65.7159 335.107 65.8409C335.175 65.9621 335.27 66.0473 335.391 66.0966C335.516 66.1458 335.66 66.1705 335.823 66.1705C335.937 66.1705 336.05 66.161 336.164 66.142C336.278 66.1193 336.365 66.1023 336.425 66.0909L336.806 67.892C336.685 67.9299 336.514 67.9735 336.295 68.0227C336.075 68.0758 335.808 68.108 335.494 68.1193C334.91 68.142 334.399 68.0644 333.96 67.8864C333.524 67.7083 333.185 67.4318 332.942 67.0568C332.7 66.6818 332.581 66.2083 332.585 65.6364V57.1818ZM342.073 68.1705C341.191 68.1705 340.427 67.983 339.783 67.608C339.143 67.2292 338.649 66.7027 338.3 66.0284C337.952 65.3504 337.778 64.5644 337.778 63.6705C337.778 62.7689 337.952 61.9811 338.3 61.3068C338.649 60.6288 339.143 60.1023 339.783 59.7273C340.427 59.3485 341.191 59.1591 342.073 59.1591C342.956 59.1591 343.717 59.3485 344.357 59.7273C345.001 60.1023 345.497 60.6288 345.846 61.3068C346.194 61.9811 346.369 62.7689 346.369 63.6705C346.369 64.5644 346.194 65.3504 345.846 66.0284C345.497 66.7027 345.001 67.2292 344.357 67.608C343.717 67.983 342.956 68.1705 342.073 68.1705ZM342.085 66.2955C342.486 66.2955 342.821 66.1818 343.09 65.9545C343.359 65.7235 343.562 65.4091 343.698 65.0114C343.838 64.6136 343.908 64.161 343.908 63.6534C343.908 63.1458 343.838 62.6932 343.698 62.2955C343.562 61.8977 343.359 61.5833 343.09 61.3523C342.821 61.1212 342.486 61.0057 342.085 61.0057C341.679 61.0057 341.338 61.1212 341.062 61.3523C340.789 61.5833 340.583 61.8977 340.442 62.2955C340.306 62.6932 340.238 63.1458 340.238 63.6534C340.238 64.161 340.306 64.6136 340.442 65.0114C340.583 65.4091 340.789 65.7235 341.062 65.9545C341.338 66.1818 341.679 66.2955 342.085 66.2955Z" fill="white"/>
        <path d="M398.646 43.6464C398.451 43.8417 398.451 44.1583 398.646 44.3536L401.828 47.5355C402.024 47.7308 402.34 47.7308 402.536 47.5355C402.731 47.3403 402.731 47.0237 402.536 46.8284L399.707 44L402.536 41.1716C402.731 40.9763 402.731 40.6597 402.536 40.4645C402.34 40.2692 402.024 40.2692 401.828 40.4645L398.646 43.6464ZM498 43.5L399 43.5V44.5L498 44.5V43.5Z" fill="black"/>
        <path d="M498.354 79.3536C498.549 79.1583 498.549 78.8417 498.354 78.6464L495.172 75.4645C494.976 75.2692 494.66 75.2692 494.464 75.4645C494.269 75.6597 494.269 75.9763 494.464 76.1716L497.293 79L494.464 81.8284C494.269 82.0237 494.269 82.3403 494.464 82.5355C494.66 82.7308 494.976 82.7308 495.172 82.5355L498.354 79.3536ZM399 79.5H498V78.5H399V79.5Z" fill="black"/>
        <path d="M417.163 21.636H417.967V23.4C417.967 25.692 416.587 27.996 414.859 28.848L414.283 28.056C415.855 27.312 417.163 25.272 417.163 23.4V21.636ZM417.355 21.636H418.159V23.4C418.159 25.236 419.467 27.108 421.063 27.792L420.499 28.584C418.747 27.768 417.355 25.656 417.355 23.4V21.636ZM414.643 21.192H420.703V22.032H414.643V21.192ZM422.167 20.088H423.163V30.936H422.167V20.088ZM432.75 20.088H433.746V25.956H432.75V20.088ZM433.47 22.644H435.354V23.484H433.47V22.644ZM429.738 20.736H430.818C430.818 23.472 428.898 25.308 425.73 26.088L425.346 25.272C428.154 24.6 429.738 23.124 429.738 21.228V20.736ZM425.826 20.736H430.338V21.552H425.826V20.736ZM426.894 26.448H427.878V27.804H432.762V26.448H433.746V30.792H426.894V26.448ZM427.878 28.596V29.988H432.762V28.596H427.878ZM445.532 22.896H447.98V23.724H445.532V22.896ZM447.668 20.088H448.664V26.556H447.668V20.088ZM445.1 26.88C447.332 26.88 448.712 27.636 448.712 28.908C448.712 30.192 447.332 30.924 445.1 30.924C442.856 30.924 441.476 30.192 441.476 28.908C441.476 27.636 442.856 26.88 445.1 26.88ZM445.1 27.66C443.468 27.66 442.472 28.116 442.472 28.908C442.472 29.688 443.468 30.144 445.1 30.144C446.732 30.144 447.728 29.688 447.728 28.908C447.728 28.116 446.732 27.66 445.1 27.66ZM442.508 21.18H443.324V22.056C443.324 24.06 442.1 25.776 440.3 26.448L439.784 25.656C441.392 25.068 442.508 23.616 442.508 22.056V21.18ZM442.7 21.18H443.504V22.056C443.504 23.46 444.56 24.804 446.132 25.356L445.628 26.148C443.864 25.512 442.7 23.88 442.7 22.056V21.18ZM440.084 20.88H445.88V21.696H440.084V20.88ZM450.788 28.728H460.616V29.556H450.788V28.728ZM455.18 26.136H456.176V28.968H455.18V26.136ZM451.94 20.856H452.924V22.788H458.456V20.856H459.44V26.4H451.94V20.856ZM452.924 23.592V25.584H458.456V23.592H452.924ZM469.711 20.088H470.719V25.908H469.711V20.088ZM463.723 26.448H464.707V27.768H469.735V26.448H470.719V30.792H463.723V26.448ZM464.707 28.56V29.988H469.735V28.56H464.707ZM464.899 20.604C466.543 20.604 467.719 21.624 467.719 23.1C467.719 24.588 466.543 25.608 464.899 25.608C463.255 25.608 462.067 24.588 462.067 23.1C462.067 21.624 463.255 20.604 464.899 20.604ZM464.899 21.432C463.819 21.432 463.039 22.116 463.039 23.1C463.039 24.084 463.819 24.768 464.899 24.768C465.979 24.768 466.759 24.084 466.759 23.1C466.759 22.116 465.979 21.432 464.899 21.432ZM473.31 25.464H474.09C476.226 25.464 477.282 25.428 478.578 25.2L478.686 26.004C477.342 26.244 476.262 26.28 474.09 26.28H473.31V25.464ZM473.286 20.736H477.966V23.82H474.294V25.956H473.31V23.04H476.982V21.552H473.286V20.736ZM480.786 20.1H481.782V26.76H480.786V20.1ZM478.686 21.696H481.014V22.512H478.686V21.696ZM478.686 23.94H481.014V24.756H478.686V23.94ZM474.522 27.348H481.782V30.96H480.786V28.164H474.522V27.348Z" fill="black"/>
        <path d="M395.306 98.82H400.286V103.476H395.306V98.82ZM399.314 99.624H396.278V102.672H399.314V99.624ZM402.278 98.088H403.274V104.268H402.278V98.088ZM402.998 100.692H404.882V101.52H402.998V100.692ZM399.386 105.288H400.238V105.576C400.238 107.28 398.45 108.54 396.314 108.9L395.93 108.132C397.802 107.844 399.386 106.788 399.386 105.576V105.288ZM399.578 105.288H400.43V105.576C400.43 106.764 402.038 107.844 403.874 108.144L403.502 108.912C401.378 108.552 399.578 107.244 399.578 105.576V105.288ZM396.35 104.916H403.466V105.708H396.35V104.916ZM410.305 104.064H411.289V105.78H410.305V104.064ZM405.889 103.44H415.693V104.256H405.889V103.44ZM410.305 98.016H411.289V99.54H410.305V98.016ZM410.257 99.624H411.133V99.792C411.133 101.556 409.141 102.576 406.765 102.816L406.465 102.048C408.565 101.88 410.257 101.028 410.257 99.792V99.624ZM410.461 99.624H411.337V99.792C411.337 101.028 413.017 101.88 415.129 102.048L414.829 102.816C412.453 102.576 410.461 101.556 410.461 99.792V99.624ZM406.897 99.108H414.697V99.9H406.897V99.108ZM407.089 105.432H414.493V108.792H407.089V105.432ZM413.521 106.224H408.073V107.988H413.521V106.224ZM423.036 100.692H425.244V101.508H423.036V100.692ZM423.024 102.804H425.232V103.62H423.024V102.804ZM416.952 99.276H423.024V100.08H416.952V99.276ZM420.024 100.644C421.476 100.644 422.472 101.436 422.472 102.648C422.472 103.86 421.476 104.664 420.024 104.664C418.572 104.664 417.564 103.86 417.564 102.648C417.564 101.436 418.572 100.644 420.024 100.644ZM420.024 101.412C419.112 101.412 418.5 101.892 418.5 102.648C418.5 103.404 419.112 103.896 420.024 103.896C420.924 103.896 421.548 103.404 421.548 102.648C421.548 101.892 420.924 101.412 420.024 101.412ZM419.532 97.992H420.528V99.84H419.532V97.992ZM424.86 98.088H425.856V105.096H424.86V98.088ZM422.304 105.204C424.548 105.204 425.916 105.888 425.916 107.064C425.916 108.24 424.548 108.912 422.304 108.912C420.048 108.912 418.692 108.24 418.692 107.064C418.692 105.888 420.048 105.204 422.304 105.204ZM422.304 105.996C420.708 105.996 419.724 106.368 419.724 107.064C419.724 107.748 420.708 108.144 422.304 108.144C423.9 108.144 424.884 107.748 424.884 107.064C424.884 106.368 423.9 105.996 422.304 105.996ZM431.342 104.652H441.17V105.48H431.342V104.652ZM435.758 104.892H436.742V108.948H435.758V104.892ZM432.65 102.732H440.078V103.548H432.65V102.732ZM432.65 98.592H439.958V99.396H433.634V102.972H432.65V98.592ZM433.346 100.644H439.694V101.424H433.346V100.644ZM445.069 99.636H445.861V101.4C445.861 103.656 444.481 105.984 442.789 106.848L442.213 106.056C443.761 105.3 445.069 103.236 445.069 101.4V99.636ZM445.249 99.636H446.041V101.4C446.041 103.116 447.265 105.048 448.837 105.792L448.273 106.584C446.557 105.732 445.249 103.548 445.249 101.4V99.636ZM442.597 99.192H448.441V100.032H442.597V99.192ZM449.725 98.088H450.733V108.936H449.725V98.088ZM450.493 102.468H452.509V103.308H450.493V102.468ZM462.591 100.896H465.039V101.724H462.591V100.896ZM464.727 98.088H465.723V104.556H464.727V98.088ZM462.159 104.88C464.391 104.88 465.771 105.636 465.771 106.908C465.771 108.192 464.391 108.924 462.159 108.924C459.915 108.924 458.535 108.192 458.535 106.908C458.535 105.636 459.915 104.88 462.159 104.88ZM462.159 105.66C460.527 105.66 459.531 106.116 459.531 106.908C459.531 107.688 460.527 108.144 462.159 108.144C463.791 108.144 464.787 107.688 464.787 106.908C464.787 106.116 463.791 105.66 462.159 105.66ZM459.567 99.18H460.383V100.056C460.383 102.06 459.159 103.776 457.359 104.448L456.843 103.656C458.451 103.068 459.567 101.616 459.567 100.056V99.18ZM459.759 99.18H460.563V100.056C460.563 101.46 461.619 102.804 463.191 103.356L462.687 104.148C460.923 103.512 459.759 101.88 459.759 100.056V99.18ZM457.143 98.88H462.939V99.696H457.143V98.88ZM467.846 106.728H477.674V107.556H467.846V106.728ZM472.238 104.136H473.234V106.968H472.238V104.136ZM468.998 98.856H469.982V100.788H475.514V98.856H476.498V104.4H468.998V98.856ZM469.982 101.592V103.584H475.514V101.592H469.982ZM490.504 98.088H491.464V108.936H490.504V98.088ZM486.556 101.976H488.632V102.804H486.556V101.976ZM488.332 98.34H489.268V108.384H488.332V98.34ZM484.468 99.768H485.236V101.148C485.236 103.524 484.324 105.768 482.728 106.776L482.116 106.032C483.628 105.12 484.468 103.14 484.468 101.148V99.768ZM484.672 99.768H485.44V101.148C485.44 103.032 486.256 104.916 487.744 105.78L487.132 106.512C485.548 105.552 484.672 103.416 484.672 101.148V99.768ZM482.416 99.348H487.372V100.176H482.416V99.348ZM498.159 104.928C500.463 104.928 501.939 105.684 501.939 106.932C501.939 108.168 500.463 108.912 498.159 108.912C495.843 108.912 494.379 108.168 494.379 106.932C494.379 105.684 495.843 104.928 498.159 104.928ZM498.159 105.708C496.455 105.708 495.363 106.176 495.363 106.932C495.363 107.676 496.455 108.144 498.159 108.144C499.863 108.144 500.943 107.676 500.943 106.932C500.943 106.176 499.863 105.708 498.159 105.708ZM494.463 98.628H501.447V99.444H494.463V98.628ZM493.299 103.14H503.091V103.944H493.299V103.14ZM497.319 101.052H498.303V103.368H497.319V101.052ZM500.871 98.628H501.843V99.552C501.843 100.428 501.843 101.304 501.555 102.432L500.571 102.312C500.871 101.196 500.871 100.404 500.871 99.552V98.628Z" fill="black"/>
        <path d="M135.646 78.6464C135.451 78.8417 135.451 79.1583 135.646 79.3536L138.828 82.5355C139.024 82.7308 139.34 82.7308 139.536 82.5355C139.731 82.3403 139.731 82.0237 139.536 81.8284L136.707 79L139.536 76.1716C139.731 75.9763 139.731 75.6597 139.536 75.4645C139.34 75.2692 139.024 75.2692 138.828 75.4645L135.646 78.6464ZM235 78.5L136 78.5V79.5L235 79.5V78.5Z" fill="black"/>
        <path d="M235.354 44.3536C235.549 44.1583 235.549 43.8417 235.354 43.6464L232.172 40.4645C231.976 40.2692 231.66 40.2692 231.464 40.4645C231.269 40.6597 231.269 40.9763 231.464 41.1716L234.293 44L231.464 46.8284C231.269 47.0237 231.269 47.3403 231.464 47.5355C231.66 47.7308 231.976 47.7308 232.172 47.5355L235.354 44.3536ZM136 44.5H235V43.5H136V44.5Z" fill="black"/>
        <path d="M164.01 100.652H173.838V101.48H164.01V100.652ZM168.426 100.892H169.41V104.948H168.426V100.892ZM165.318 98.732H172.746V99.548H165.318V98.732ZM165.318 94.592H172.626V95.396H166.302V98.972H165.318V94.592ZM166.014 96.644H172.362V97.424H166.014V96.644ZM177.737 95.636H178.529V97.4C178.529 99.656 177.149 101.984 175.457 102.848L174.881 102.056C176.429 101.3 177.737 99.236 177.737 97.4V95.636ZM177.917 95.636H178.709V97.4C178.709 99.116 179.933 101.048 181.505 101.792L180.941 102.584C179.225 101.732 177.917 99.548 177.917 97.4V95.636ZM175.265 95.192H181.109V96.032H175.265V95.192ZM182.393 94.088H183.401V104.936H182.393V94.088ZM183.161 98.468H185.177V99.308H183.161V98.468ZM193.984 94.088H194.98V99.704H193.984V94.088ZM187.972 100.256H194.992V102.86H188.968V104.348H187.996V102.116H194.008V101.036H187.972V100.256ZM187.996 104.024H195.352V104.816H187.996V104.024ZM188.92 94.4H189.748V95.228C189.748 97.232 188.5 98.936 186.664 99.608L186.172 98.816C187.804 98.24 188.92 96.8 188.92 95.228V94.4ZM189.1 94.4H189.916V95.228C189.916 96.728 191.056 98.084 192.664 98.612L192.172 99.392C190.348 98.768 189.1 97.172 189.1 95.228V94.4ZM205.323 94.088H206.271V100.952H205.323V94.088ZM203.559 97.028H205.611V97.856H203.559V97.028ZM203.007 94.304H203.943V100.568H203.007V94.304ZM197.079 95.384H202.575V96.176H197.079V95.384ZM199.839 96.728C201.195 96.728 202.143 97.472 202.143 98.588C202.143 99.716 201.195 100.448 199.839 100.448C198.471 100.448 197.523 99.716 197.523 98.588C197.523 97.472 198.471 96.728 199.839 96.728ZM199.839 97.472C198.987 97.472 198.411 97.916 198.411 98.588C198.411 99.272 198.987 99.704 199.839 99.704C200.679 99.704 201.255 99.272 201.255 98.588C201.255 97.916 200.679 97.472 199.839 97.472ZM199.347 94.172H200.319V95.828H199.347V94.172ZM202.719 101.144C204.975 101.144 206.331 101.816 206.331 103.028C206.331 104.228 204.975 104.912 202.719 104.912C200.439 104.912 199.095 104.228 199.095 103.028C199.095 101.816 200.439 101.144 202.719 101.144ZM202.719 101.912C201.051 101.912 200.079 102.308 200.079 103.028C200.079 103.748 201.051 104.156 202.719 104.156C204.363 104.156 205.347 103.748 205.347 103.028C205.347 102.308 204.363 101.912 202.719 101.912Z" fill="black"/>
        <path d="M151.783 26.652H161.611V27.48H151.783V26.652ZM156.199 26.892H157.183V30.948H156.199V26.892ZM153.091 24.732H160.519V25.548H153.091V24.732ZM153.091 20.592H160.399V21.396H154.075V24.972H153.091V20.592ZM153.787 22.644H160.135V23.424H153.787V22.644ZM165.51 21.636H166.302V23.4C166.302 25.656 164.922 27.984 163.23 28.848L162.654 28.056C164.202 27.3 165.51 25.236 165.51 23.4V21.636ZM165.69 21.636H166.482V23.4C166.482 25.116 167.706 27.048 169.278 27.792L168.714 28.584C166.998 27.732 165.69 25.548 165.69 23.4V21.636ZM163.038 21.192H168.882V22.032H163.038V21.192ZM170.166 20.088H171.174V30.936H170.166V20.088ZM170.934 24.468H172.95V25.308H170.934V24.468ZM179.657 22.896H182.105V23.724H179.657V22.896ZM181.793 20.088H182.789V26.556H181.793V20.088ZM179.225 26.88C181.457 26.88 182.837 27.636 182.837 28.908C182.837 30.192 181.457 30.924 179.225 30.924C176.981 30.924 175.601 30.192 175.601 28.908C175.601 27.636 176.981 26.88 179.225 26.88ZM179.225 27.66C177.593 27.66 176.597 28.116 176.597 28.908C176.597 29.688 177.593 30.144 179.225 30.144C180.857 30.144 181.853 29.688 181.853 28.908C181.853 28.116 180.857 27.66 179.225 27.66ZM176.633 21.18H177.449V22.056C177.449 24.06 176.225 25.776 174.425 26.448L173.909 25.656C175.517 25.068 176.633 23.616 176.633 22.056V21.18ZM176.825 21.18H177.629V22.056C177.629 23.46 178.685 24.804 180.257 25.356L179.753 26.148C177.989 25.512 176.825 23.88 176.825 22.056V21.18ZM174.209 20.88H180.005V21.696H174.209V20.88ZM184.913 28.728H194.741V29.556H184.913V28.728ZM189.305 26.136H190.301V28.968H189.305V26.136ZM186.065 20.856H187.049V22.788H192.581V20.856H193.565V26.4H186.065V20.856ZM187.049 23.592V25.584H192.581V23.592H187.049ZM203.707 20.472H204.583V21.072C204.583 23.148 202.471 24.636 200.215 25.02L199.819 24.216C201.799 23.916 203.707 22.62 203.707 21.072V20.472ZM203.887 20.472H204.751V21.072C204.751 22.584 206.683 23.916 208.639 24.216L208.243 25.02C206.011 24.636 203.887 23.124 203.887 21.072V20.472ZM203.707 26.808H204.691V30.936H203.707V26.808ZM199.327 26.196H209.131V27.024H199.327V26.196ZM213.246 21.024H214.074V21.852C214.074 23.76 212.826 25.368 211.002 25.992L210.498 25.2C212.13 24.672 213.246 23.328 213.246 21.852V21.024ZM213.438 21.024H214.266V21.852C214.266 23.256 215.406 24.516 217.002 25.02L216.51 25.8C214.71 25.212 213.438 23.688 213.438 21.852V21.024ZM210.774 20.796H216.714V21.6H210.774V20.796ZM218.25 20.088H219.258V25.956H218.25V20.088ZM212.262 26.496H213.246V27.78H218.274V26.496H219.258V30.792H212.262V26.496ZM213.246 28.584V29.976H218.274V28.584H213.246Z" fill="black"/>
    </svg>
    </Svgcover>
    <div style={{height:"50px"}}/>


</section>

<section className="bg-gray-100">
<div style={{height:"50px"}}/>

<h2 className="mb-5 text-2xl text-black tracking-tight font-extrabold text-gray-900 dark:text-white" style={{textAlign:"center", paddingTop:"50px"}}>왜 사용해야 할까요?</h2>
<div style={{height:"50px"}}/>

<div className="overflow-hidden bg-gray py-0 sm:py-6">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">올인원 투자서비스</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">자산조회부터 투자관리까지</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Linkrypto 는 투자를 위한 내 자산의 현황조회, 자산의 최적 활용처 조회, 그리고 투자 성적표 확인까지 통합 서비스를 제공합니다.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div>
          <img
            src={investInfo}
            alt="Product screenshot"
            className="w-[48rem] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            // width={"100%"}
          />

        <div style={{marginTop:"20px"}}/>
          <img
            src={assetperformance}
            alt="Product screenshot"
            className="w-[48rem] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            // width={"100%"}
          />

        <div style={{marginTop:"20px"}}/>
          <img
            src={investdetail}
            alt="Product screenshot"
            className="w-[48rem] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            // width={"100%"}
          />

          </div>
          

          
          

        </div>
      </div>
    </div>
    <div style={{height:"100px"}}/>
    </section>

    <section className="bg-gray-100 pt-5 pb-5" style={{textAlign:"center"}}>
        {/* <h2 className="mb-5 text-2xl text-black tracking-tight font-extrabold text-gray-900 dark:text-white" style={{textAlign:"center", paddingTop:"50px"}}> */}
            Contact : linkryptocontact@gmail.com
        {/* </h2> */}
    </section>

{/* <section className="bg-gray-000 pt-10 pb-10" style={{textAlign:"center", width:"100%"}}>
    <p className="mb-2 font-medium text-gray-500 md:text-lg dark:text-gray-400"> 5월 17일 베타 출시이후 지표</p>
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-8 lg:px-12">
    <dl class="grid grid-cols-3 gap-0 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-2 dark:text-white sm:p-8">
                <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">10</dt>
                    <dd class="text-gray-500 dark:text-gray-400">누적 연결된 지갑수</dd>
                </div>
                <div class="flex flex-col">
                    <dt class="mb-2 text-3xl font-extrabold">100 만원</dt>
                    <dd class="text-gray-500 dark:text-gray-400">투자된 자금</dd>
                </div>
            </dl>
            </div>
</section> */}

    {/* <section className="bg-white pt-10 pb-10" style={{textAlign:"center", width:"100%"}}>
        <p className="mb-2 font-medium text-gray-500 md:text-lg dark:text-gray-400"> Powered by </p>
        <div style={{textAlign:"center"}} className="py-0 px-4 mx-auto max-w-screen-xl text-center lg:py-0 lg:px-12">
            <Svgcover style={{margin:"0px auto"}}>
                <img src={bifrost} width={120} height={150} style={{color:"gray"}} /> 
                </Svgcover>
        </div>
    </section> */}


    </>
  );
}

const Svgcover = styled.div`
    display : inline-flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
    @media screen and (max-width: 500px){
      display: flex;
      /* margin: 10px 10px; */
      /* font-size: 12px; */
    }`

export default Landing;

