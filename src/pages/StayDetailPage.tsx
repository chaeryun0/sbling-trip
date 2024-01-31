import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Title from '@components/shared/Title'
import useStayList from '@components/stayList/hooks/useStayList'
import { RootState } from '@redux/store'

import IconArrow from '@assets/icon/icon-arrowRight.svg?react'
import classNames from 'classnames/bind'
import styles from './StayDetailPage.module.scss'

const cx = classNames.bind(styles)

const StayDetailPage = () => {
  const [showAll, setShowAll] = useState(false)

  const { staySeq } = useParams<{ staySeq?: string }>()
  const { fetchStayDetail } = useStayList()
  const { currentStay } = useSelector((state: RootState) => state.stay)

  const { description, refundPolicy, facilitiesDetail, foodBeverageArea } =
    currentStay ?? {}

  const handleShowAllClick = () => {
    setShowAll((prev) => !prev)
  }

  useEffect(() => {
    const staySeqNumber = parseInt(staySeq ?? '', 10)

    if (!isNaN(staySeqNumber)) {
      fetchStayDetail(staySeqNumber)
    } else {
      console.error('Invalid staySeq:', staySeq)
    }
  }, [staySeq, fetchStayDetail])

  if (!currentStay) {
    return <div>Loading</div>
  }

  return (
    <main>
      <div className={cx('stayDetailContainer')}>
        <div className={cx('stayDetailInner')}>
          <div className={cx('mainContents')}>
            <section className={cx('info')}>
              <div className={cx('infoBody')}>
                <div className={cx('container')}>
                  <Title
                    title="숙소 소개"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                  <div className={cx('intro', { showAll: showAll })}>
                    <p className={cx({ showAll: showAll })}>{description}</p>
                  </div>
                  <div
                    role="button"
                    className={cx('btnWrap', { showAll: showAll })}
                  >
                    <button
                      type="button"
                      className={cx('showAllBtn')}
                      onClick={handleShowAllClick}
                    >
                      모두 보기
                      <IconArrow
                        width={20}
                        height={20}
                        fill="var(--blue500)"
                        className={cx('iconArrow')}
                      />
                    </button>
                  </div>
                </div>
                <hr />
                <div className={cx('container')}>
                  <Title
                    title="숙소 시설 및 서비스"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                  <section className={cx('infoSection')}>
                    <ul className={cx('infoList')}>
                      {facilitiesDetail && <li>{facilitiesDetail}</li>}
                      {foodBeverageArea && <li>{foodBeverageArea}</li>}
                    </ul>
                  </section>
                </div>
                <hr />
                <div className={cx('container')}>
                  <Title
                    title="숙소 이용 정보"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                </div>
                <hr />
                <div className={cx('container')}>
                  <Title
                    title="취소 및 환불 규정"
                    subTitle=""
                    className={cx('stayTitle')}
                  />
                  <ul className={cx('infoList')}>
                    <li>
                      {refundPolicy
                        ? refundPolicy
                        : '객실별 취소 정책이 상이하니 객실 상세정보에서 확인해주세요.'}
                    </li>
                  </ul>
                </div>
                <hr />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default StayDetailPage