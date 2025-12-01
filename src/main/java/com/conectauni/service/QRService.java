package com.conectauni.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;
import java.util.HashMap;

@Service
public class QRService {
    public void generateQRCodeImage(String text, int width, int height, String filePath) throws Exception {
        var hints = new HashMap<EncodeHintType, Object>();
        hints.put(EncodeHintType.MARGIN, 1);
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height, hints);
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                int rgb = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFFFF;
                image.setRGB(x,y, rgb);
            }
        }
        File out = Path.of(filePath).toFile();
        out.getParentFile().mkdirs();
        ImageIO.write(image, "PNG", out);
    }
}
