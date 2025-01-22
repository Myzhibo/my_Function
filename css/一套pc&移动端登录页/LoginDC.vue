<script setup lang="ts">
import type { ILoginDcProps, ILoginEmits } from '@/views/Login/types';
import { getFileByDir } from '@/utils';

const props = defineProps<ILoginDcProps>();
const emits = defineEmits<ILoginEmits>();

// 检查设备是否为移动设备
const isMobile = computed(() =>
  /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent.toLowerCase()
  )
);
const qrcodeVisible = ref<boolean>(false);
const username = ref<string>('');
const password = ref<string>('');
const images = getFileByDir('dc');

const openQRCode = () => {
  qrcodeVisible.value = true;
};

const closeQRCode = () => {
  qrcodeVisible.value = false;
};

const loginHandler = () => {
  emits('login', username.value, password.value);
};
</script>

<template>
  <div class="login-dc">
    <div :class="{ isMobile: isMobile, container: !isMobile }">
      <div :class="{ 'mobile-top': isMobile, 'pc-left': !isMobile }">
        <div :class="{ 'top-m': isMobile, 'top-p': !isMobile }">
          <img
            :class="{ 'logo-m': isMobile, 'logo-p': !isMobile }"
            src="@/assets/images/dc/logo.png"
            alt=""
          />
        </div>
        <div :class="{ 'middle-m': isMobile, 'middle-p': !isMobile }">
          <img
            :class="{ 'Tlogo-m': isMobile, 'Tlogo-p': !isMobile }"
            src="@/assets/images/dc/tLogo.png"
            alt=""
          />
        </div>
        <div :class="{ 'bottom-m': isMobile, 'bottom-p': !isMobile }">
          <img
            :class="{ 'comp-m': isMobile, 'comp-p': !isMobile }"
            src="@/assets/images/dc/comp.png"
            alt=""
          />
        </div>
      </div>
      <div :class="{ 'mobile-bottom': isMobile, 'pc-right': !isMobile }">
        <div :class="{ 'top-m2': isMobile, 'top-p2': !isMobile }">
          <span :class="{ 'title-m': isMobile, 'title-p': !isMobile }">数字资源服务平台</span>
        </div>
        <div :class="{ 'middle-m2': isMobile, 'middle-p2': !isMobile }">
          <div :class="{ 'login-m': isMobile, 'login-p': !isMobile }">
            <div :class="{ 'login-m1': isMobile, 'login-p1': !isMobile }">登录</div>
            <div :class="{ 'login-m2': isMobile, 'login-p2': !isMobile }">
              <el-tooltip
                class="item"
                effect="light"
                content-class="custom-content"
                placement="right-start"
                :disabled="isMobile"
              >
                <template v-slot:content>
                  <span>
                    <img
                      src="@/assets/images/dc/qrcode.jpg"
                      style="width: 8vw; height: 8vw; object-fit: contain; z-index: 9999"
                      alt="二维码"
                    />
                  </span>
                </template>
                <span style="cursor: pointer" @click="openQRCode">
                  联系教学服务顾问，开通专属平台账号
                  <el-icon>
                    <i-eq-QuestionFilled />
                  </el-icon>
                </span>
              </el-tooltip>
            </div>
            <div :class="{ 'login-m3': isMobile, 'login-p3': !isMobile }">
              <el-input
                v-model="username"
                :class="{
                  'login-m3-input': isMobile,
                  'login-p3-input': !isMobile
                }"
                placeholder="请输入手机号"
              ></el-input>
            </div>
            <div :class="{ 'login-m4': isMobile, 'login-p4': !isMobile }">
              <el-input
                v-model="password"
                :class="{
                  'login-m4-input': isMobile,
                  'login-p4-input': !isMobile
                }"
                placeholder="请输入密码"
                type="password"
              ></el-input>
            </div>
            <div :class="{ 'login-m5': isMobile, 'login-p5': !isMobile }">
              <img
                @click="loginHandler"
                src="@/assets/images/dc/button.png"
                alt=""
                :class="{
                  'login-m5-button': isMobile,
                  'login-p5-button': !isMobile
                }"
              />
            </div>
          </div>
        </div>
        <div :class="{ 'bottom-m2': isMobile, 'bottom-p2': !isMobile }">
          <div :class="{ 'bottom-m2-sp': isMobile, 'bottom-p2-sp': !isMobile }">
            <span
              :class="{ 'bottom-m2-sp1': isMobile, 'bottom-p2-sp1': !isMobile }"
              style="display: flex; align-items: center"
            >
              ©{{ new Date().getFullYear() }}河南鼎成教育科技有限公司 &nbsp;&nbsp;&nbsp;&nbsp;
              <img
                :class="{ 'bottom-m2-gov': isMobile, 'bottom-p2-gov': !isMobile }"
                src="@/assets/images/hexin/gov.png"
              />
              &nbsp;
              <a
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=豫公网安备41019702003679号"
                class="a-tag"
                target="_blank"
              >
                豫公网安备41019702003679号
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://beian.miit.gov.cn/" class="a-tag" target="_blank">
                豫ICP备2024064528号
              </a>
            </span>
          </div>
        </div>
      </div>
      <div v-if="qrcodeVisible" class="modal-overlay" @click="closeQRCode">
        <div class="modal-content" @click.stop>
          <img
            src="@/assets/images/dc/qrcode.jpg"
            style="width: 50vw; height: 50vw; object-fit: contain; z-index: 9999"
            alt="二维码"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

$bg-color: #d70c18;

:deep(.el-input__inner) {
  height: 3.5vw;
  border-radius: 0.5vw;
  padding: 0 1vw;
  border: 0;
}

:deep(.el-input) {
  display: block;
}

.isMobile {
  width: 100vw;
  height: 100vh;
  background-color: $bg-color;

  .mobile-top {
    width: 100vw;
    height: 55vh;
    background-color: white;
    border-radius: 0 0 1vw 1vw;

    .top-m {
      width: 100vw;
      height: 10vh;

      .logo-m {
        width: 20vw;
        height: 4vh;
        object-fit: contain;
        margin-top: 2vh;
        margin-left: 5vw;
      }
    }

    .middle-m {
      width: 100vw;
      height: 38vh;

      .Tlogo-m {
        width: 100vw;
        height: 35vh;
        object-fit: contain;
      }
    }

    .bottom-m {
      width: 100vw;
      height: 7vh;

      .comp-m {
        width: 100vw;
        height: 2vh;
        object-fit: contain;
      }
    }
  }

  .mobile-bottom {
    width: 100vw;
    height: 45vh;

    .top-m2 {
      width: 100vw;
      height: 12vh;

      .title-m {
        width: 100%;
        height: 100%;
        font-size: 3vh;
        color: white;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .middle-m2 {
      width: 100vw;
      height: 25vh;
      display: flex;
      align-items: center;
      justify-content: center;

      .login-m {
        width: 70vw;
        height: 20vh;
        position: relative;

        .login-m1 {
          width: 70vw;
          font-size: 2.5vh;
          color: white;
          font-weight: 700;
        }

        .login-m2 {
          width: 70vw;
          height: 1.8vh;
          font-size: 1.8vw;
          color: white;
          margin-top: 1vw;
        }

        .login-m3 {
          width: 70vw;
          height: 4vh;
          margin-top: 3.4vw;

          .login-m3-input {
            height: 2vh;
            font-size: 1.6vw;
            width: 100%;
            :deep(.el-input__wrapper) {
              width: 100%;
            }
          }
        }

        .login-m4 {
          width: 70vw;
          height: 1vh;
          margin-top: 2vw;

          .login-m4-input {
            height: 2vh;
            font-size: 1.6vw;
            width: 100%;
            :deep(.el-input__wrapper) {
              width: 100%;
            }
          }
        }

        .login-m5 {
          width: 70vw;
          height: 1vh;
          display: flex;
          justify-content: right;

          .login-m5-button {
            width: 10vw;
            height: 5vh;
            object-fit: contain;
            margin-top: 2vh;
            cursor: pointer;
          }
        }
      }
    }

    .bottom-m2 {
      width: 100vw;
      height: 8vh;
      display: flex;
      justify-content: center;
      position: relative;

      .bottom-m2-sp {
        bottom: 6vw;
        position: absolute;

        .bottom-m2-sp1 {
          font-size: 1.8vw;
          color: white;
        }
        .bottom-m2-gov {
          width: 2vw;
          height: 2vw;
          object-fit: contain;
        }
      }
    }
  }

  :deep(.el-input__inner) {
    height: 5vw;
    padding: 0 1vw;
    border: 0;
  }
}

.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: $bg-color;
}

.pc-left {
  width: 55vw;
  height: 100vh;
  background-color: white;
  border-radius: 0 1vw 1vw 0;

  .top-p {
    width: 55vw;
    height: 16vh;

    .logo-p {
      width: 18vw;
      height: 6vh;
      object-fit: contain;
      margin-top: 2vw;
    }
  }

  .middle-p {
    width: 55vw;
    height: 68vh;

    .Tlogo-p {
      width: 55vw;
      height: 68vh;
      object-fit: contain;
    }
  }

  .bottom-p {
    width: 55vw;
    height: 16vh;

    .comp-p {
      width: 55vw;
      height: 3vh;
      object-fit: contain;
      margin-top: 4vw;
    }
  }
}

.pc-right {
  width: 45vw;
  height: 100vh;
  background-color: $bg-color;

  .top-p2 {
    width: 45vw;
    height: 34vh;

    .title-p {
      width: 100%;
      height: 100%;
      font-size: 4vw;
      color: white;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .middle-p2 {
    width: 45vw;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-p {
      width: 32.5vw;
      height: 40vh;
      position: relative;
      :deep(.el-input__wrapper) {
        width: 100%;
        border-radius: 0.5vw;
        box-sizing: border-box;
      }

      .login-p1 {
        width: 32.5vw;
        font-size: 2.5vw;
        color: white;
        font-weight: 700;
      }

      .login-p2 {
        width: 32.5vw;
        height: 1.8vh;
        font-size: 1vw;
        color: white;
        margin-top: 1vw;
      }

      .login-p3 {
        width: 32.5vw;
        height: 8vh;
        margin-top: 3.4vw;

        .login-p3-input {
          height: 6vh;
          font-size: 1vw;
        }
      }

      .login-p4 {
        width: 32.5vw;
        height: 8vh;
        margin-top: 2vw;

        .login-p4-input {
          height: 6vh;
          font-size: 1vw;
        }
      }

      .login-p5 {
        width: 32.5vw;
        height: 3vw;
        display: flex;
        justify-content: right;

        .login-p5-button {
          width: 5vw;
          height: 4vh;
          object-fit: contain;
          margin-top: 2vh;
          cursor: pointer;
        }
      }
    }
  }

  .bottom-p2 {
    width: 45vw;
    height: 16vh;
    display: flex;
    justify-content: center;

    .bottom-p2-sp {
      bottom: 2vw;
      position: absolute;

      .bottom-p2-sp1 {
        font-size: 0.8vw;
        color: white;
      }
      .bottom-p2-gov {
        width: 0.8vw;
        height: 0.8vw;
        object-fit: contain;
      }
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
.a-tag {
  // 不要变色
  color: white;
  cursor: pointer;
  &:hover {
    color: white;
  }
}
</style>
