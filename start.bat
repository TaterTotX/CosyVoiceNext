@echo off
setlocal EnableDelayedExpansion

:: 读取.env.local文件中的代理设置
if exist .env.local (
    for /f "tokens=*" %%a in (.env.local) do (
        set line=%%a
        if "!line:~0,11!"=="HTTP_PROXY=" (
            set http_proxy=!line:~11!
            set http_proxy=!http_proxy:"=!
            echo 已从.env.local设置HTTP代理: !http_proxy!
        )
        if "!line:~0,12!"=="HTTPS_PROXY=" (
            set https_proxy=!line:~12!
            set https_proxy=!https_proxy:"=!
            echo 已从.env.local设置HTTPS代理: !https_proxy!
        )
    )
) else (
    echo 未找到.env.local文件,无法使用代理设置
)

:: 设置颜色代码
set "GREEN=[32m"
set "RED=[31m"
set "NC=[0m"

:: 寻找可用端口
set port=3000
:findPort
netstat -an | find ":%port%" > nul
if not errorlevel 1 (
    echo 端口 %port% 已被占用，尝试下一个端口...
    set /a port+=1
    goto findPort
)
echo 将使用端口: %port%

:: 构建docker镜像
echo 开始构建 Docker 镜像...
docker build -t cosy-voice-next .
if %errorlevel% equ 0 (
    echo %GREEN%Docker 镜像构建成功%NC%
) else (
    echo %RED%Docker 镜像构建失败%NC%
    exit /b 1
)

:: 运行docker容器
echo 开始运行 Docker 容器...
for /f "tokens=*" %%i in ('docker run -d -p %port%:3000 cosy-voice-next') do set CONTAINER_ID=%%i
if %errorlevel% equ 0 (
    echo %GREEN%容器启动成功，容器ID: %CONTAINER_ID%%NC%
    echo 等待应用启动...
    timeout /t 3 /nobreak > nul

    :: 检查应用是否成功启动
    curl -s http://localhost:%port% > nul
    if %errorlevel% equ 0 (
        echo %GREEN%应用成功启动%NC%
        start http://localhost:%port%
    ) else (
        echo %RED%应用启动失败，请检查日志%NC%
        echo 查看容器日志：
        docker logs %CONTAINER_ID%
    )
) else (
    echo %RED%容器启动失败%NC%
    exit /b 1
)

echo.
echo 使用以下命令可以查看容器日志：
echo docker logs %CONTAINER_ID%
echo.
echo 使用以下命令可以停止容器：
echo docker stop %CONTAINER_ID%

endlocal